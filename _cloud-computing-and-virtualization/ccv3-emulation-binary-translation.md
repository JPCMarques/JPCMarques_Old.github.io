---
layout: cloud-computing-and-virtualization
title: "Emulation: Binary Translation"
sidebarlinks:
  - Home: emulation-binary-translation
  - Binary Translation: binary-translation
  - Code Discovery and Dynamic Binary Translation: code-discovery-and-dynamic-binary-translation
  - Same-ISA Emulation: same-isa-emulation
  - Control Transfer Optimizations: control-transfer-optimizations
  - Instruction-Set Issues: instruction-set-issues
---

# {{page.title}}

---

## Binary Translation

Another process of converting

- Different from other emulation techniques

- From source binary directly into target binary

Its goal is to enhance performance, and removal of interpreter routine overhead

This is done through the mapping each source instruction to its own customized target code. That code is then executed, almost as if a native binary in the target architecture

### Predecoding and Binary Translation

Both convert source machine code into another form, bur predecoding and DT interpretation still require constant overhead:

  - Predecoding and DT interpretation call interpreter routine for each and every instruction emulated

    - Each type of source instruction maps to a routine
    - Poor code locality, parameter passing, many jump targets

  - **Binary translation** -- converted code is executed directly

### Binary Translation and State Mapping

Simple binary translation:

  - One-by-one instruction translation

  - Always loads and saves registers from context block (more memory accesses in target code w.r.t. source)

  - Does not leverage information about
    - Source registers used in consecutive source instructions
    - Target registers used to simulate source registers

There is room for improvement:

  - Avoid constant access to register context in memory, by remembering which registers hold values of source registers between instructions

    Direct access to target registers in target code - register **state-mapping**

Target register point to the **memory image** and **register block** of the source ISA. Other portions of the **source state** (PC, SP), may be held in target registers.
Some of the **source registers** are mapped directly to **target registers**. Do note that some registers are *reserved* for the emulator's own use.

**Performance improvement**:
  - Reduced target code size
  - No redundant access to register context block
  - Reduce total memory accesses from 9 to 2

## Code Discovery and Dynamic Translation

Static *a priori* predecoding or binary translation

  - Only uses static program information
  - Not always possible, or very difficult (sometimes even undesirable -- translation of code that is never executed)

Why use it then? Due to the **Code Discovery Problem**:

  - **Indirect Jumps** (using register values as targets)

    Impossible to predict before actual execution

  - Some compilers **intersperse data with code**

    Information about registers saved upon procedure call. Translating this data as if it was code corrupts their value

  - **Padding for alignment**

    Unused bytes to force jumps on word boundary or cache line for performance

  - **Variable length** instructions (CISC ISA)

    Any byte can be a multi-byte instruction boundary, making it difficult to know whether it is the beginning or the middle of the instruction

### Code Location Problem

Translated code uses **TPC**, while source code uses **SPC** (target and source program counters, respectively).

Handling indirect jumps in TPC:

  - Register holds a source code address in target code
  - Emulation must map SPC address to TPC address
  - Translated code *per se* may not work

    Solution: incremental predecoding and translation

### Incremental Predecoding and Translation

Predecode or Translate binary while program is running

  - **Emulation Manager** provides a high-level control

    Coordinates translation, interpretation and execution. Operates with **interpreter** and **binary translator**

  - **Code Translation**

    Use actual data while running, translating one section of code at a time (e.g. basic block)

    - Only translated (ideally) once, after that the translated code is placed in a **code cache**, which is managed with replacing policies

    Interpretation provides dynamic information needed for translation, such as the target address of indirect jumps.

  - **Map Table**

    Associates SPC for block of source code to TPC of corresponding block of translated code.

    Indexes the code cache, decides *hit* or triggers translation (*miss*)

#### Static vs Dynamic Basic Blocks

**Static basic blocks**

  - Code sequences with one entry and one exit
  - Begin and end with control transfer instructions or targets

**Dynamic basic blocks**

  - Determined by the actual flow of control at run time
  - Often larger and in greater numbers than SSB
  - Begin just after a taken branch, ends with next branch
  - One instruction may belong to several DBB
  - Optimization: combine more than one DBB

#### Control Flow with Translated Blocks

  1. Load source binary into memory
  2. Initially interpret
      - Decode and dispatch, indirect threaded, ...
  3. Dynamically perform translation
      - Translated code into cache
      - SPC->TPC mapping
  4. When jump/branch found
      - Dynamic basic block completed
  5. EM (Emulation Manager) follows target (via map)
      1. Execute next dynamic basic block
      2. If absent, translate it
      3. Eventually, all executed code is translated, except control flow among blocks handled by EM

#### Incremental Predecoding and Translation

**Dynamic Translation Flowchart**

````text
1. Start with SPC
2. Look up SPC<-->TPC in Map Table
  1. If hit in table
    1. Branch to TPC and execute translated block
  2. Else
    1. Use SPC to read instructions from source memory image
    2. Interpret, translate and place the code into the code cache
    3. Write new SPC<-->TPC mapping into Map Table
  3. Get SPC for next block
  4. Go back to 2
````

Branches into middle of code
- Already translated
- Could divide block
- Requires address ranges

Using **dynamic** basic blocks
- Requires only target address
- Easier to implement
- Possible replicated code

Tracking source program code
- Keep track of SPC at **all times** among EM, interpreter and translated DBBs
- End of block -> pass SPC to EM
  - Interpreter -> EM -- easy, interpret jump
  - Translated code -> EM
    - Link translated blocks via stub
    - Map SPC to a target register
    - Place next SPC in a "stub" (e.g. using JAL, jump-and-link)
      - End of DBB
      - EM can get SPc via link register

#### Binary Translation with Map Table and Stubs

1.  Translated basic block is executed
2.  Branch taken to **stub code**
3.  Stub does **branch and link** to EM entry point
4.  EM loads SPC from stub code, using link register
5.  EM lookup SPC in Map Table
6.  EM loads SPC value from Map Table
7.  Branch to code that will transfer code back to the translation
8.  Load TPC from Map Table
9.  Jump indirect to next translated basic block
10. Continue execution

## Same-ISA EMulation

Emulates an ISA on a CPU with the same ISA, greatly simplifying binary translation

This is useful due to the fact that the EM oversees the code execution:
  - Always in control of the software being executed
  - It can monitor execution at any desired level of detail
  - Interception, optimization
  - **Code management**

**Applications**

- **Simulation**

  Collect dynamic program properties

- **OS system call emulation**

  Same ISA but different OS - all OS traps can be detected, emulated and translated to host OS calls

- Discovery and management of **sensitive previleged instructions**

  This is key to emulation of guest OS kernel code in System VMs

- **Program shepherding**

  Monitor program execution to ensure no exploitation of security holes

- **Dynamic binary optimization**

  Gather run time information and optimize a binary program at runtime

## Control Transfer Optimizations

Has the goal of reducing, or even eliminating, overhead of control flow emulation of the guest, such as branch/jump instructions, or routine call/returns.

This is done through:

- **Translation Chaining**

  Analogous to threading w.r.t. interpreters, with the goal of avoiding **indirect transfers** among blocks via EM, and improvement of overall performance.

  Joins translated blocks, linked into chains, dynamically as they are created, to be executed in sequence without branching to EM code. This is achieved by direct branching among translated blocks.

  1. Replace `JAL` instructions with **direct jump** to successor translated block
  2. Address of successor code is determined:
    1. Use SPC as key in Map Table
    2. If block is already translated, get TPC and replace jump
    3. Else insert stub code. Later, successor is translated when executed.
  4. Next time predecessor exits, EM is able to overwrite jump, direct into translated code

  This only works for direct jumps, with explicit target address in instruction, without use of registers (e.g. `JMP AX` does not benefit from this optimization)

- **Software Indirect Jump Prediction**

  Used to optimize indirect jumps, something Translation Chaining can't do -- indirect jumps through Map Table are expensive at run time
  - Caused by the need to use several instructions: hash SPC, index, load, compare, etc to find TPC

  Through observation, we find that
  - Although in register, target address hardly changes
  - 1-3 different targets taken most of the time
  - The code in the `switch` is not random, number of cases and some are more frequently used than others

  With this information in mind, we can implement a "cache" system of sorts in the code, to increase performance:

  ````c
  if (Rx == addr_1) goto target_1;
  else if (Rx == addr_2) goto target_2;
  else if (Rx == addr_3) goto target_3;
  else table_lookup(Rx);                //Slow af compared to the above
  ````

  Optimizations to this method:

  - Ordered comparisons, based on the frequency of the SPC (highest 1st)

    This is specially important, due to the fact that in the worst case, all comparisons fail and ``table_lookup(Rx)`` is performed. As such, special care should be taken when adding addresses to the comparisons,
    since the added overhead of the comparison for *every other* instruction may not justify the gains for skipping the lookup.

  - Coupled with profiling for accurate info regarding jump targets

  - EM removes predictions of translated blocks removed from cache

    Use side-table of SPC in predictions.

- **Shadow Stack**

  Handles invocation of routines, finished by ``RET`` instruction (no actual address explictly provided)

  Requires preservation of return address
  - No direct jump from the end of routine
  - Performed indirectly (recalling address of instruction after ``CALL``)
    - E.g. obtained from stack (IA-32), saved on a special register (PPC), ...

  Return address refers to SPC
  - Maintained in source architected state (stack/register)
  - Requires lookup map table (SPC --> TPC) to find target code, adding overhead to the emulation process

  Optimized by maintaining the shadow stack with TPC addresses

  [Example: emulation of IA-32 on PPC](../examples/ia32-ppc-emulation/)

## Instruction Set Issues

- **Register architectures** -- Register mappings, reservation of special registers

  Almost every ISA contains registers of some kind. Thus, register handling is key for emulation performance

  Usage of general registers of target ISA:

    - Hold general-purpose registers of the source ISA

    - Hold special-purpose registers of the source ISA

      Cannot be saved on equivalent registers of the target ISA


- **Condition codes** -- Lazy evaluation as needed

- Data formats and operations

- Address resolution

- Address Alignment

- Byte order (big/little endian)


\[WIP\]

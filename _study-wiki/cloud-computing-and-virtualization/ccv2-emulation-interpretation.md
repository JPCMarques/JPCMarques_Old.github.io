---
layout: cloud-computing-and-virtualization
title: "Emulation: Interpretation"
sidebarlinks:
  - Home: emulation-interpretation
  - Emulation Overview: emulation-overview
  - Basic Interpretation: basic-interpretation
  - Threaded Interpretation: threaded-interpretation
  - Basic Predecoding: basic-predecoding
  - Direct Threaded Interpretation: direct-threaded-interpretation
  - Interpreting a Complex Instruction Set: interpreting-a-complex-instruction-set
  - Comparison of Interpretation Techniques: comparison-of-interpretation-techniques
mother: ccv
---

# {{page.title}}

---

## Emulation Overview

**Emulation** - the process of implementing the interface and functionality of one system (or subsystem) on a system
with a different interface and functionality

**Instruction set emulation**
- Key aspect of many virtual machine implementations

- VM must support binary compiled for one ISA and run on another
  - Binaries for IA-32 are more widely available for any other ISA
  - User may leverage this and use VM to run IA-32 on PowerPC/RISC

- **Host** platform: host hardware + target ISA
  - Implements emulation
    - Instructions, registers, memory architecture
  - Reproduces expected software behaviour

- **Guest**: source ISA
  - Implementation of user applications

### Emulation methods

Wide spectrum, ranging from interpretation to binary translation:

  - **Interpretation**

    Repeated interpreter loop
      - Fetch a source instruction, analyze, perform/execute, repeat

    Small start-up cost, high execution cost -- slow, steady performance
      - Every instruction is interpreted as many times as executed

  - **Binary translation**

    Translates a block of source instruction to a block of target instruction
      - Saves translated code for repeated use
      - Only profitable if block is executed frequently

  - **Intermediate techniques**

    - *Threaded interpretation* - eliminates interpreter loop
    - *Predecoding* - intermediate formate reduces cost of (re-)analysis

## Basic interpretation

Initially used for programming language (Lisp, BASIC, ...)

VM Application:
  - Interpretation of binaries (machine code)
      1. Emulate instructions
      2. Manage complete architected (emulated) state
          - Includes registers, main memory
          - Guest program, guest data, guest stack
      3. Maintain table of *context blocks*
          - General purpose registers
          - Program counter
          - Condition codes (CPU flags)
          - Control registers (paging, interrupts, kernel/user mode, ...)

Interpreter Overview:
  - Interpreter code for instruction interpretation
  - Architected source state in interpreter's data memory

### Decode-and-Dispatch Interpreter

#### Interpretation loop

  - Stepping through the program

  - Read and modify state according to instruction

  - **Decode*** an instruction

  - **Dispatch** it to an **interpretation routine** based on the **type** of instruction

  - Type of instruction binary is obtained from representation

##### Code loop for PPC ISA interpretation

````c
while(!halt && interrupt){
  inst = code[PC];
  opcode = extract(inst, 31, 6);
  switch(opcode){
    case LoadWordAndZero: LoadWordAndZero(inst);
    case ALU: ALU(inst);
    case Branch: Branch(inst);
    //and so forth
  }
}
````

###### Emulation of PPC instruction for memory access

LWZ (load-word-and-zero): basic PPC load instruction; loads a 32-bit into a 64-bit register and zeros higher bits

**Interpreter routine for the LWZ in PPC ISA**

  - No checks for memory addressing errors

  - Extract arguments, load guest memory into guest reg, advance PC

````c
LoadWordAndZero(inst){
  RT = extract(inst, 25, 5); //target reg: start bit - field width
  RA = extract(inst, 20, 5); //source reg as base address
  displacement = extract(inst, 15, 16); //offset
  source = regs[RA];
  address = source + displacement;
  regs[RT] = (data[address]<<32)>>32;
  PC  = PC + 4;
}
````

###### Emulation of PPC instruction for ALU operations

Most notable examples are `Add` and its variations, like ``carry`` and ``sign extension`` - these have the same *primary* opcode
but different *extended* opcodes - thus requiring two levels of decoding:

````c
ALU(inst){
  RT = extract(inst, 25, 5);
  RA = extract(inst, 20, 5);
  RB = extract(inst, 15, 5);
  source1 = regs[RA];
  source2 = regs[RB];
  extended_opcode = extract(inst, 10, 10);
  switch(extended_opcode) {
    case Add: Add(inst);
    case AddCarrying: AddCarrying(inst);
    case AddExtended: AddExtended(inst);
    //...
  }
  PC = PC + 4;
}
````

Real emulatiors add more complexity, due to checking memory access violations, exceptions, register overflows...

**Advantages**

  - Low memory requirements, zero start-up time

  - Easy (and tedious) to implement

**Disadvantages**

  - Slow steady-state performance

  - Source instructions parsed on each emulated execution

  - Inefficient w.r.t. branches and code cache
    - Several jumps/branches
      - **direct**: test for halt, interrupt, loop termination, routine call
      - **indirect**: switch statement, routine return (hard to predict by CPU)

**Cost of interpretation**

Taking ``ADD`` as an example:

  - Approximately 20 target instructions
  - Several loads/stores
  - Several shift/mast steps
  - Hand-coding can lead to better performance

A possible improvement is the reduction of branch number in the decode-dispatch loop

## Threaded Interpretation

Appends a portion of dispatch code to the end of each instruction interpretation. This can eliminate a few branches, like
``switch``, ``call-ret`` and ``loop repeat``. The dispatch resorts to table, allowing for relocatable code.

|--|
| Advantages | Disadvantages |
| :--------: | :-----------: |
| Low memory requirements (but more than decode-and-dispatch) | Steady-state performance is still slow <br> <ul> <li>better than decode-and-dispatch</li> <li>still requires analysis for every instruction execution</li> <li>still employs indirect branch and access to centralized table</li> </ul> |
| Zero start-up time | |

[TODO]: check this shit


## Basic Predecoding

Based on the notion that repetitive instruction analysis and field extraction is unnecessary and introduces a needless overhead.

Parses an instruction and saves it in an intermediate form
  - Easily and efficiently accessible fields
  - Allows precombination of distinct fields (like primary and extended/secondary opcodes)
  - Simplifies and speeds up interpretation

### Predecoding for PPC ISA

#### Inefficiencies
- Opcode and extended opcode field are separated
- Register specifiers are not byte-aligned

#### Solution
- Define instruction format
- Define predecoded instruction
- Based on the format and stored in array

````c
struct instruction{
  unsigned long op;     //32 bit
  unsigned char dest;   // 8 bit
  unsigned char src1;   // 8 bit
  unsigned int src2;    //16 bit
} code[CODE_SIZE];
````

For ``lwz r1, 8(r2)``:

  |-------------------------------------|
  | Part   | Value | Reason             |
  |:------:|:-----:|:------------------:|
  |``op``  | 07    | opcode for ``lwz`` |
  |``dest``|  1    | ``r1``             |
  |``src1``|  2    | ``r1``             |
  |``src2``| 08    | ``8(r2)``          |

**Advantages**
  - Speed-up in interpretation
    - Minor benefits for regular ISA
    - Major benefits for CISC ISA

**Disadvantages**
  - Higher memory requirements
  - New sources of overhead
    - Separate target PC and synchronization with source PC
    - Not necessarily one-to-one
      - CISC have highly variable instruction length

## Direct Threaded Interpretation

Basic predecoding is indirect and still requires dispatch table
  - Requires additional memory access and indirect jump

How to eliminate this indirection?
  - Replace instruction code with actual address of interpreter routine
  - Dispatch table is removed from the emulation control flow

**Advantages**
  - Greater speed-up in interpretation
    - Fewer jumps/branches
    - Fewer memory accesses

**Disadvantages**
  - Portability issues
    - Intermediate format dependent on routine addresses
      - Exact location of routine in memory, not relocatable
    - When porting emulator to different architecture, interpreter code must be regenerated
    - **Solutions**:
      - gcc unary operator (``&&``) returns address of label
      - relative addresses for interpreter routines

## Interpreting a Complex Instruction Set

### Emulating a system with RISC-like instructions (PPC, ARM)
- Straightforward
- All instructions have the same length
- Format fields are mostly regular
- Easy to extract opcode and operands

### Emulating a system with CISC-like instructions (IA-32/x86)
- Variable instruction length and instruction format
- Variable field length and position
- Designed for code density and *orthogonality*
- Difficult and extensive
- Quite more complicated interpreter structure

### Interpreting IA-32 instructions

High variability in some fields (presence/absence, width) introduces a high level of complexity to the task at hand

Straightforward approach -- **divide instruction interpretation in two phases**:
  1. *scan and decode* fields, fill in general instruction templat (*superset*)
  2. *dispatch* step -- jump for specialized routine for each type, using parameters from instruction template

#### Optimization of IA-32 Common Cases

- Instruction dispatched to a routine based on first byte

  2 bytes: more instructions fast-dispatched, but much larger table

- Simpler, common instructions interpreted immediatelly

  Speciallized routines decode remainder of instruction bytes

- Less common instructions

  Handled by more complex routines, and may share common code of involved operations

- Prefix handling (e.g. REP, segment override)

  First-byte prefix detected, recorded and return to dispatch

- Performance

  Faster execution of **simpler and more frequent** instructions, similar to equivalent sequence of RISC instructions.

### IA-32 Threaded Interpretation

Append decode-and-dispatch code to interpretation routine of every instruction

- **RISC ISA**

  Simple, efficient and removes several branches

- **IA-32 CISC ISA**

  Append code makes interpreter much larger, with small or no performance improvement

#### Hybrid approach

Appends only the first byte of decode-and-dispatch code, optimized for threading with common cases and with a centralized routine for complex decode-and-dispatch, to emulate more complex and longer instructions

### IA-32 Direct Threaded Interpretation

Predecoding and Direct Threaded Interpretation in IA-32

- General, fixed-length predecoded instructions

- Very similar to those in decode-and-dispatch interpreter

- Leads to very large predecoded programs, with possibly 6 bytes per instruction (max length)

The solution is to use several intermediate forms with different sizes, remaining portable but becoming more complex, very similar to binary translation.

## Comparison of Interpretation Techniques

|----------------------------------------------------------------------------------------------------------------|
|                          | Decode-and-dispatch | Indirect Threaded Interpreter   | Direct Threaded Interpreter |
|:------------------------:|:-------------------:|:-------------------------------:|:---------------------------:|
| Memory requirements      | Low                 | Low (higher than DnD)           | High                        |
| Start-up performance     | Fast                | Fast                            | Slow                        |
| Steady-state performance | Slow                | Slow (slightly better than DnD) | Medium                      |
| Code portability         | Good                | Good                            | Medium                      |
|----------------------------------------------------------------------------------------------------------------|

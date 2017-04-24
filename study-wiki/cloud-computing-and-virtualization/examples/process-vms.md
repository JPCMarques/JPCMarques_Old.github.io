---
layout: subpage
title: Process VMs Example
navbar:
  - Back: study-wiki/cloud-computing-and-virtualization/ccv1-introduction/
---

## Multiprogramming

Most common and "invisible"

  - OS: each user is given the illusion of a dedicated machine

Support for multiple process at OS level

  - Replicated process-level VM
    - Each of concurrently running applications
  - Provides address space and file access

## Emulators and Dynamic Binary Translators

Execute binaries for **different** Instruction Sets than the host's

**Interpretation**: emulate instructions one-by-one

**Dynamic binary translation**: convert blocks to host instructions

Both of the above can be combined with profiling

## Same-ISA Binary Optimizers

Special case with source ISA = target ISA

  - Frequently, program binaries are relatively unoptimized
  - Only static optimizations applied by compilers

Designed to perform code optimization:

  - During execution (*on-the-fly*)
  - Profilin gathers info and drives code optimizations

## HLL virtual machines

Created to solve address difficulty of **full** cross-platform portability for any ISA

Does not correspond to any pre-existing real platform (e.g. Java VM)

Designed for ease of portability

  - Match features of high level programming language
  - Minimize H/W and OS specifics
  - **Deployment**: portable intermediate code (*virtual* ISA)
    - *bytecodes* instead of binary object native code
    - *stack-base* operations (commonly) and calls to standard libraries

VM executes portable intermediate code

  - Employing interpretation, pre-compilation or JIT-compilation
  - Type-safe, dynamic binding, garbage collection, ...

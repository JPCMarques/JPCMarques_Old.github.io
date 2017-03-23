---
layout: subpage
title: System VMs Examples
navbar:
  - Back: study-wiki/cloud-computing-and-virtualization/
---

## Classic approach (Type-1)

VMM on top of hardware
  - Initial solution, used in IBM mainframes
  - Revisited in *Windows Hyper-V*

|---|
| Pros | Cons |
| :--: | :--: |
| Completely transparent, most efficient | Installed from scratch, must include all/relevant devide drivers |

## Hosted VM (Type-2)

VMM on top of host OS
  - VMWare, VirtualPC, ...

|---|
| Pros | Cons |
| :--: | :--: |
| Installed like applications | Possible loss of efficiency due to addtional software layers |
| Leverages guest-OS drivers and lower-level services | |

## Whole-system VM

Run OS and applications on platform with different OS and ISA
  - A complete Win+Intel system looks as a single Mac application (e.g. Virtual PC for Mac - Win+Intel on MacOS+PPC)

Run multiple OS on a single platform

Separated instances of a single OS (e.g. user-mode Linux)

Hosted VM approach is more frequent

**Challenges**:

  - Emulate the hardware
  - Offer virtual version to multiple and/or different OS
  - Emulate system-ISA of guest (privileged instructions)
    - Guest-OS runs as simple application on the host-OS
    - Interception, conversion to equivalent calls to host-OS
  - Handling traps, interruptions, memory management

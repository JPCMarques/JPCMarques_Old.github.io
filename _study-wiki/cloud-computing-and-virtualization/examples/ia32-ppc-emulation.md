---
layout: subpage
title: IA-32 Emulation on PPC Example
relativenavbar: true
mother: ccv-ex
navbar:
  - Back: study-wiki/cloud-computing-and-virtualization/ccv3-emulation-binary-translation/
---

Routine call places SPC return address on stack in architected source state

**Optimization** -- on call, save on shadow stack:
- **PPC return address** to translated code -- to avoid lookup on map table
- **IA-32 return address** of source -- to confirm no changes to stack by routine code
- **IA-32 SP** -- to confirm stack frames have not been dropped

Otherwise, resort to slow approach via map table lookup of source stack

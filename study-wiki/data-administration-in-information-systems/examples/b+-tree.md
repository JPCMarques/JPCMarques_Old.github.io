---
layout: subpage
title: B<sup>+</sup> Tree Example
navbar:
  - Back: study-wiki/database-administration-in-information-systems/
---

B<sup>+</sup> tree with n=6

- Leaf nodes must have between 3 and 5 values

  ⌈(n-1)/2⌉ and n-1
  
- Non-leaf nodes other than root must have between 3 and 6 children

  ⌈n/2⌉ and n
  
- Root must have at least 2 children
---
layout: study-wiki-page
title: Virtual Memory
bodyClass: homepage-body
contentClass: regular-text
headerClass: header-text
sidebarClass: sidebar
sidebarlinks:
    - Introduction
    - Physical address sharing
    - Address translation
    - Page tables
    - Replacement and writes
    - Page table dimension
    - Hierarchical page table
    - Inverted page table
    - Virtual addressing with a cache
---

<div id="Introduction"></div>

## Introduction ##
---

Virtual memory can be simplified in the following points:

* Usage of main memory as a cache for secondary (disk) storage
    * Managed by CPU hardware and OS

* Each program has its own **virtual** address space
    * The same **virtual** address for two programs refers to different **physical** addresses
    * The main memory is shared by all programs, but each program has a **private** physical address space protected from other programs

* CPU and OS translate the virtual address to the physical address.
    * A block is called a page
    * A translation miss is called page fault



<br>
<div id="Physical address sharing"></div>

## Physical address sharing ##
---
    
A program's address space is divided into pages (fixed size) or segments (variable size).

The starting location of each page in main or secondary memory is kept in the page table.


<br>
<div id="Address translation"></div>

## Address translation ##
---

A virtual address is translated to a physical address by a combination of hardwate and software.
<br>

```
    31 30                         12 11           0
    +-------------------------------+-------------+
    | Virtual page number           | Page offset |
    +-------------------------------+-------------+
                |                          |
            Translation                    |
                |                          |
                V                          V
         +--------------------------+-------------+
         | Physical page number     | Page offset |
         +--------------------------+-------------+
         29                       12 11           0
```
<br>
Each memory access first requires an address translation from the virtual to the physical space

* When the page is not in main memory (virtual memory miss), it's called a page fault (page can be in disk).

Just as cache accommodates a subset of primary memory positions, the primary memory accommodates a subset of virtual
memory positions

* **Block** = **Page**
* **Page dimension** is usually large, to increase efficiency of disk accesses (also reduces dimension of translation tables);
the bigger it is, the higher the the potential memory waste (average of 50% of page dimension). Typical values are 4k or 8k bytes
* **Full associativity**

<br>
<div id="Page tables"></div>

## Page tables ##
---

Store placement information, as an array of page table entries, indexed by virtual page number. The page table register 
in CPU points to page table in physical memory.

If a page is present in memory, the Page Table Entry (PTE) stores the physical page number and some other status bits
(referenced, dirty, ...)

If a page is not present in memory, the PTE can refer to a location in swap space on disk

<br>
<div id="Replacement and writes"></div>

### Replacement and Writes ###
---

To reduce page faults, prefer **LRU** replacement:

* Reference/use bit in PTE set to 1 on access to page, periodically cleared to 0 by OS
* A page with use bit 0 has not been used recently.

Disk writes take millions of cycles:

* Block should be written at once, not individual locations
* Write-through is impractical, write-back is the way to go
* Set dirty bit in PTE to 1 when page is written

<br>
<div id="Page table dimension"></div>

### Page table dimension ###
---

One common problem in paging systems is the dimension of the page table that is required to translate the addresses: it 
must be allocated in a contiguous region at physical memory

Example:

* Virtual space with 2<sup>32</sup> bytes
* Pages with 4k(2<sup>12</sup>) bytes
* Descriptor with 4 bytes

Table will have 2<sup>20</sup> (2<sup>32-12</sup>) entries, each with 4 bytes, thus occupying 4 Mbytes.

<br>
<div id="Hierarchical page table"></div>

### Hierarchical page table ###
---

A common solution to the space problem of the page tables is to implement translation with a hierachy of translation tables

The virtual address can be seen as:

```
    +---------------+---------------+-----+---------------+--------+
    | Level 1 index | Level 2 index | ... | Level n index | offset |
    +---------------+---------------+-----+---------------+--------+
```

Example:

* 2 levels
* Virtual address with 2<sup>32</sup> bytes
* Pages with 4k (2<sup>12</sup>) bytes
* Descriptor with 4 bytes

Directory (level 1) has 1024 (2<sup>10</sup>) entries. Each level 2 table has another 1024 entries (2<sup>(32-12)/2</sup>).

Total of 1M entries, corresponding to 4M bytes, just as the non-hierarchical example with the same settings.

However, **only the directory must be in memory** (other levels can be in disk)

This approach is usually adopted with the following parameters:

* Page tables have the same dimensions as pages
* Only the pages under use have to be in primary memory
* Only the required pages are instantiated

Do note, however, that the levels can be divided into different size indexes.

<br>
<div id="Inverted page table"></div>

### Inverted page table ###
---

Address translation is based on hash tables:

* A given hash function **H(x)** is applied to the virtual address to find out a particular queue of descriptors composed by
pairs **virtual page-physical page** whose corresponding virtual addresses lead to the same value of the hash function H(x)
-> **collisions**
* The required physical address may or may not be present in that queue of descriptors.

The size of Inverted Page Table is proportional to the size of the physical address space.

<br>
<div id="Virtual addressing with a cache"></div>

### Virtual addressing with a cache ###
---

It takes at least an extra memory access to translate virtual address to physical address, thus making memory accesses
even more expensive

The hardware fix is to use a Translation Lookaside Buffer (TLB), a small cache that keeps track of recently used address
mappings to avoid doing a page lookup

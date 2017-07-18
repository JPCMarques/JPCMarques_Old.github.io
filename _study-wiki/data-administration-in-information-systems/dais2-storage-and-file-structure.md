---
layout: data-administration-in-information-systems
title: Storage and File Structure

sidebarlinks:
  - Home: storage-and-file-structure
  - Physical Storage Media: physical-storage-media
  - File Organization: file-organization
  - Data-Dictionary Storage: data-dictionary-storage
  - Storage Access and Buffer Management: storage-access-and-buffer-management
---

# {{page.title}} #

---

## Physical Storage Media ##

---

### Classification ###

Physical storage media can be classified with the following metrics:

* **Speed** with which data is accessed
* **Cost** per unit of data
* **Reliability**
  * Data loss on power failure or system crash
  * Physical failure of the storage device
* **Volatility**
  * Loses content when power is switched off -> **volatile**
  * Content is persistent even when power is switched off -> **non-volatile**
    * Includes secondary and tertiary storage, as well as battery backed up main memory

### Storage Hierarchy ###

* **Primary**: fastest but volatile (cache, main memory)
* **Secondary** (or on-line): non-volatile, slower than primary but much faster than tertiary and non-volatile
* **Tertiary** (or off-line): lowest in hierarchy, slow access time and non-volatile

### Types of physical storage ###

* **Cache**
  * Fastest
  * Most costly
  * Volatile
  * Managed by the computer system hardware
* **Main memory** (RAM)
  * Fast
  * Generally too small or too expensive to store the entire database
  * Volatile
* **Flash memory**
  * Cost per byte lower than RAM
  * Data survives power failure
  * Reads are roughly as fast as main memory
  * Writes are slow and erase is even slower
  * Widely used in embedded devices USB keys
  * SSD are based in flash memory
* **Magnetic Disk**
  * Data stored on spinning disk, and written/read magnetically
  * Primary medium for long-term storage of data, typically stores the entire database
  * Data must be moved from disk to main memory for access, and written back for storage, thus being much slower than RAM
  * **Direct access** - possible to read data on disk in any order, unlike magnetic tape
  * Capacities reach up to 1.5 TB 
    * Larger capacity and lower cost/byte than RAM/Flash
    * Grows by a factor of 2-3 every 2 years
  * Survives power failures and system crashes  
* **Optical storage** (CD-ROM, DVDs, etc)
  * Non-volatile
  * Data read optically from a spinning disk using a laser
  * Reads and writes are slower than with magnetic disk
* **Tape storage**
  * Non-volatile
  * Used for backup and archival data
  * **Sequential access** - much slower than disk
  * Very high capacity
  * Tape can be removed from drive, storage costs used to be cheaper than disk (they no longer are)
  
### Magnetic Disks ###

* **Read-Write Head**
  * Positioned very close to platter surface
  * Reads/Writes magnetically encoded information
* Surface of platter divided into circular **tracks**
  * Typically over 50-100k tracks per platter
  * 1-5 platters per disk
* Each track is divided into **sectors** (smallest data unit that can be read)
  * Usually 512 bytes
  * Normally 500 to 1000 per inner tracks and 1000 to 2000 on outer tracks
  * To read/write a sector, disk arm swings to position head on right track; with the platter spinning continuously, data 
  is read as sector passes the head
* **Hard Disk Assemblies**
  * Multiple platters on a spindle
  * One head per platter, mounted on a common arm
* **Cylinder *i*** is the *i*<sup>th</sup> track of all the platters
* **Disk controller** is the set of interfaces between the computer system and the disk drive hardware
  * Accepts high-level commands to read or write a sector
  * Initiates actions such as moving the disk arm to the right track and actually reading or writing the data
  * Computes and attaches checksums to each sector to verify that data is read back correctly
    * If data is corrupted, stored checksum will probably not match recompiled checksum
  * Ensures successful writing ny reading back sector after writing it
  
### Performance Metrics ###

* **Access time**
  
  Time from when a read or write request is issued to when the actual data transfer begins. Encompasses:
  
  * **Seek time**
  
    Time it takes to reposition the arm over the correct track
    
  * **Rotational latency**
  
    Time it takes for the sector that is to be accessed to appear under the head
    
* **Data-transfer rate**

  Rate at which data can be retrieved from or stored to the disk
  
  * The closer to the centre of the disk the track is, the lower the transfer rate
  * Multiple disks may share a controller, so the rate that the controller can handle can possibly introduce an overhead

* **MTTF**

  Average time the disk is expected to run continuously without any failure
  
  MTTF = (short period of time * nb items tested) / nb of items tested that failed during that time

  Decreases as disk ages
  

### Disk-block access ###

* **Block**

  Contiguous sequence of sectors from a single track. The data is transferred between the disk and main memory in blocks
(or pages). Sizes range from 512 bytes and several kilobytes; typically from 4 to 16 kb. 

  Smaller blocks = more transfers from disk, while bigger blocks = more wasted space due to partial fills

  A sequence of request for blocks from the disk is classified as:

  * **Sequential**, if requests are for successive block numbers, which are on same or adjacent tracks
  * **Random**, if requests are for blocks randomly located on disk

#### Optimization of disk-block access ####

* **Buffering**

  Blocks that are read from disk are stored temporarily in an in-memory buffer
  
* **Read-ahead**

  When a *new* disk block is accessed, consecutive blocks from the same track are read into an in-memory buffer even
  if there is no pending request for the blocks useful for sequential access (taking advantage of **spatial locality**)
  
* **Disk arm scheduling**

  Algorithms order pending accesses to tracks so that disk arm movement is minimized
  
  * **Elevator algorithm** - move disk arm in one direction, processing next request in that direction, till no more requests
  in that direction, then reverse direction and repeat
  
* **File organization**

  Organize the blocks so that they correspond to how data is accessed (e.g. all blocks from one file should be contiguous)

  Due to additions/removals, or free scattered blocks, files may get *fragmented*, causing increased disk arm movement
  and as such increased access time
  
* **Non-volatile write buffers**

  Write blocks to non-volatile RAM buffer immediately. Non-volatile RAM consists of battery backed up RAM or flash memory.
  If power fails, data is safe and will be written to disk when power returns
  
  Controller then writes to disk when the disk has no other requests or request has been pending for a specified amount of time
  
  Database operations that require data to be safely stored before continuing can continue without waiting for data 
  to be written to disk
  
### RAID (Redundant Arrays of Independent/Inexpensive Disks)###

Disk organization techniques that manage a large number of disks, providing a view of a single disk that offers

* **High capacity and speed** by using multiple disks in parallel
* **High reliability** by storing data redundantly, so that data can be recovered even if a disk fails

Self-evidently, the chance of a single disk failing out of N disks is much higher than the chance of specific one failing;
the higher the number of disks in a system, the lower the MTTF.

#### Improvement of Reliability via Redundancy ####

* **Redundancy** - store extra information that can be used to rebuild information lost in a disk failure

  Simplest but most expensive redundancy approach: **mirroring/shadowing**
  
  * **Duplicate *every* disk** - a logical disk consists of two physical disks
    
  * Every write is carried out on **both** disks and reads can be from **either** disk
   
  * If **one** disk in the pair **fails**, data is still available in the **other**. As such, data loss only occurs if both
  disks fail before the system is repaired, which is very unlikely to happen.
  
  * **Mean time to data loss** of a mirrored disk system depends on
  
    * MTTF
    * **Mean time to repair** (average time to replace a failed disk and restore its data)
  
  MTTF Group = (MTTF Disk) **/** (Nb disks) **/** (Probability of another failure in the group (before dead disk is repaired))
  
  Probability of another failure in a group = (MTTR) **/** (MTTF Disk) **/** (Nb disks - 1)
  
  * MTTR/MTTF Disk if a group of 2
  
  MTTF 2 Disk group = MTTF Disk / 2 * MTTF Disk / MTTR = (MTTF Disk)<sup>2</sup>/(2 * MTTF)
  
  
#### Improvement in Performance via Parallelism ####

The main goals of parallelism are:

* **Load balance** multiple small accesses to increase throughput
* **Parallelize large accesses** to reduce response time
* Improve transfer rate by **striping** data across multiple disks
  * **Bit-level striping**
  
      Split the bits of each byte across multiple disks, causing each access to read data at eight time the rate of a single disk.
      This creates faster reads, but seek/access time (much) worse than for a single disk, which caused this striping to fall out
      of use.
   
  * **Block-level striping**
  
      *n* disks, block *i* of file goes to disk *i* mod *n* + 1.
      
      Requests for different blocks can run in parallel if the blocks reside in different disks
      
      Requests for long sequences of blocks can use all disks in parallel

#### RAID Levels ####

RAID organizations (levels) have differing costs, performance and reliability characteristics
 
  * **Level 0**: Block-level striping, non-redundant
  
    High performance applications where data loss is **not** critical
    
  * **Level 1**: Block-level striping, mirrored disks
  
    Popular for applications like storing log files in a database system
    
  * **Level 2**: Memory-Style Error-correcting codes with bit striping
  * **Level 3**: Bit-interleaved parity
  
    A single parity bit is enough for error correction, not just detection, since we know which disk failed
    
    * When writing data, corresponding parity bits must also be computed and written to a parity bit disk
    * To recover data in a damaged disk, compute XOR of bits from other disks (including parity bit disk)
    
    Faster data transfer than level 1, and fewer I/Os per second since every disk has to participate in every I/O
  
  * **Level 4**: Block-interleaved parity
  
    * Uses block-level striping, and keeps a parity block on a separate disk for corresponding blocks from *N* other disks
    * When writing data block, corresponding block of parity bits must also be computed and written to parity disk
    * To find value of a damaged block, compute XOR of bits from corresponding blocks (including parity block) from 
    other disks
    * Provides **higher** I/O rates for independent block reads than Level 3
      * Block read goes to a single disk, so blocks stored on different disks can be read in parallel
    * Before **writing** a block, parity data must be computed
      * Can be done by using old parity block, old value of current block and new value of current block (2 block read + 2
      block writes)
      * Or by re-computing the parity value using the new values of blocks corresponding to parity block (more efficient
      for writing large amounts of data sequentially)
    * Parity block becomes a bottleneck for independent block writes since every block write alse writes to parity disk
    
  * **Level 5**: Block-interleaved distributed parity
  
    Partitions data and parity among all N+1 disks, instead of storing data in N disks and parity in the other
    
    * **Higher** I/O rates than level 4 (block writes occur in parallel if the blocks and their parity blocks are on different disks)
    * Subsumes level 4 (same benefits, minimized parity block bottleneck)
    
  * **Level 6**: P+Q Redundancy scheme
  
    Similar to level 5, but stores extra redundant information to guard against multiple disk failures
     
    Better reliability than level 5 at a higher cost, not used as widely
    
#### Choice of RAID level ####

Factors in choosing RAID level:

* **Monetary cost** of extra disk-storage
* **Performance** (IOPS, bandwidth during normal operation)
* **Performance during failure**
* **Performance during rebuild** of failed disk (including time taken to rebuild the disk)

RAID 0 is used only when data safety is not important/data can be retrieved easily from other sources

RAID 2 and 4 never used since they are subsumed by 3 and 5, respectively.

RAID 3 is not used since bit-striping forces single block reads to access all disks, wasting disk arm movement

RAID 6 is rarely used since levels 1 and 5 offer adequate safety

Competition is between **RAID 1 and 5**

  * RAID 1 provides **much better write** performance than RAID 5
  
    RAID 5 requires 2 block reads and 2 block writes per block, while RAID 1 only requires 2 block writes
    
    RAID 1 preferred for **high update environments**, such as log disks
    
  * RAID 5 is preferred for applications with low update rate, and large amounts of data
  * RAID 1 is preferred for all other applications
 
## File Organization ##

---

The **database** is stored as a collection of **files**. Each **file** is a sequence of **records**. Each record is
a sequence of **fields**.

Records are mapped onto disk **blocks** or **pages**

- Number of records per block depends on the data organization
- Blocks/pages are the units of storage and data transfer
- 4 to 8 kb, but value may be specified when creating a database instance

- One approach is **fixed-length records**
  
  - Assume record size is fixed
  - Each file has records of one particular type only
  - Different files are used for different relations
  - Easiest case to implement
  
  Store record *i* starting from byte *n* * *(i-1)*, where *n* is the size of each record
  
  Record access is simple but records may cross blocks. This can be circumvented by allocating only as many records to a 
  block as would fit entirely in the block
  
  Deletion of record *i* has several alternatives:
  
    - Move all records *i + 1, ..., n* to *i, ..., n-1*
    - Move record *n* to *i*
    - Do not move records, but link all free records on a **free list**
    
      - Store the address of the first deleted record in the **file header**
      - Use first record to store address of the second deleted record, and so on
      - These addresses are essentially **pointers** since they point to the location of a record
      - More space efficient representation: reuse space normally reserved for attributes on free record to store
      the pointers
     
- Another approach is **variable-length records**

  - Storage of multiple record types in a file
  - Record types that allow variable lengths for one or more fields (e.g. *varchars*)
  - Record types that allow repeating fields
  
  - **Two problems**
    
    - How to represent a single record in a way that individual attributes can be easily extracted 
    
      - Attributes are stored in order; two parts: a first one for fixed size attributes and a second one with data for
      variable-length attributes
      - **Fixed-length** attributes are allocated as many bytes as required to store their value
      - **Variable-length** attributes are represented by fixed size pair (offset, length), with actual data stored
      after all fixed length attributes
      - **Null** values represented by null-value bitmap
      
    - How to store variable-length records within a block such that records in a block can be easily extracted

      - **Slotted page header** contains
        - Number of record entries
        - End of free space in the block
        - Location and size of each record
      - Records can be moved around within a page to keep them contiguous with no empty space between them; entry in
      the header must be updated
      - Pointers should not point directly to the record, but to the entry for the record in the header
     
  
### Organization of records in files  ###

- **Heap** 

  Record can be placed anywhere in the file where there is space
 
- **Sequential**

  Store records in sequential order, based on the value of the search key of each record, being suitable for applications
  requiring sequential processing of the entire file
  
  **Deletion** - use pointer chains
  **Insertion** - locate the position where the record is to be inserted
    1. If there is free space insert there
    2. If no free space, insert the record in an *overflow block*
    3. Pointer chain is updated
    
  File **must be reorganized** from time to time to restore the sequential order
  
- **Hashing**

  Hash function computed on some attribute(s) of each record; the result specifies in which block of the file the record
  is to be placed
  
- **Multi-table clustering file organization**

  Records of several different relations can be stored in the same file - store related records on the same block to 
  minimize I/O
  
#### Comparison of organizations ####

|--|
| | **Heap** | **Sorted** | **Hashed** |
| :-: | :-: | :-: | :-: |
| Scan all records | B\*D | B\*D | 1.25\*B\*D |
| Equality search | 0.5\*B\*B | D\*log<sub>2</sub>B | D |
| Range search | B\*D | D\*log<sub>2</sub>B+ND\*D | 1.25\*B\*D |
| Insert | 2\*D | Search+B\*D | 2\*D |
| Delete | Search+D | Search+B\*D | 2\*D |

* B: nb blocks with data
* D: average time of R/W a block
* ND: nb of blocks with matching records

## Data-Dictionary Storage ##

---

Also called **system catalog**, it stores **metadata**, such as:

- Information about relations

  - Names of relations
  - Names and types of attributes of the relation
  - Names and definitions of views
  - Integrity constraints
  
- User information, including passwords

- Statistical and descriptive data
  
  - Number of tuples in each relation, ...
  
- Physical file organization information

  - Storage method (sequential, hash,...)
  - Physical location of relation
  
- Index information

## Storage Access and Buffer Management ##

---

A database file is partitioned into fixed-length storage units called **blocks/pages**

Database system seeks to minimize the number of block transfers between the disk and memory, by keeping as many blocks
as possible in main memory

**Buffer** - portion of main memory available to store copies of blocks

**Buffer Manager** - Subsystem responsible for allocating buffer space in the main memory, to store copies of disk blocks

  - Called when a block is needed from disk
  - If the block is already *in** the buffer, return the address of the block in main memory
  - If it is *not* in the buffer
    1. Allocate space in the buffer for the block
      
        1. Replacing some other block, if required to make space for the new block
        2. Replaced block written back to disk only if it was modified since the most recent time it was written to/fetched 
      from the disk
    
    2. Read the block from disk to the buffer, and return the address of the block in main memory to the requester
    
### Buffer Replacement Policies ###

Most OS's use LRU, to make use of temporal locality

Queries have well-defined access patterns and, as such, a database system can use the information in a user's query
to predict future references

  - LRU can be a bad strategy for certain access patterns involving repeated scans of data
  - Mixed strategy with hints on replacement strategy provided by the query optimizer is preferable
  
    - **Toss-immediate**
    
      Frees space occupied by a block as soon as the final tuple of the block has been processed
      
    - **MRU** (**M**ost **R**ecently **U**sed)
    
      System must pin the block currently being processed. After that block's final tuple has been processed, the block
      is unpinned and becomes the MRU
      
      - *Pinned* block is not allowed to be written back to disk, and must be unpinned by the system after being 
      processed
      
Buffer Manager can use statistical information regarding the probability that a request will reference a particular
relation

Buffer Manager can also support **forced output** of blocks for the purpose of recovery
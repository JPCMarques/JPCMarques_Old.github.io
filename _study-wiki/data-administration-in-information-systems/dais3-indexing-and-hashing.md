---
layout: data-administration-in-information-systems
title: Indexing and Hashing
sidebarlinks:
  - Home: indexing-and-hashing
  - Basic Concepts: basic-concepts
  - Ordered Indices: ordered-indices
  - Multiple-key access: multiple-key-access
  - Covering Indices: covering-indices
  - Static Hashing: static-hashing
  - Hash Indices: hash-indices
  - Dynamic Hashing: dynamic-hashing
  - Ordered Indexing vs Hashing: ordered-indexing-vs-hashing
  - Index Definition in SQL: index-definition-in-sql
  - Bitmap indices: bitmap-indices
---

# {{page.title}}

---

## Basic concepts

---

Indexing mechanisms are used to speed up access to desired data

- **Search key**

  Attribute or set of attributes used to look up records in a file

- **Index file**

  Consists of records (index entries/index records) of the form

  ````

    +------------+----------+
    | Search key | Pointers |
    +------------+----------+

  ````
  Much smaller than the original file

  Indices can be categorized in two basic types:

  - **Ordered indices**

    Search keys are stored in sorted order

  - **Hash indices**

    Search keys are distributed uniformly across buckets using a hash function

  And can be evaluated using the following metrics:

  - **Access types**

    Types of accesses efficiently supported, including:

    - Finding records with a specified value in the attribute

    - Finding records with an attribute falling in a specified range of values

  - **Access time**

    Time it takes to find a particular data item or set of items using an indexing technique

  - **Insertion time**

    Time it takes to insert a new data item (finding the correct place to insert -> update the index structure)

  - **Deletion time**

    Time it takes to delete a data item (finding the item -> update index structure)

  - **Space overhead**

    Additional space occupied by an index structure (usually worthwhile to sacrifice it to gain performance)


## Ordered Indices

---

In an **ordered index**, entries are stored sorted on the search key value

- **Clustering (or clustered) index**

  The ordering of the data records in a sequentially ordered file is the same as the index entries

  - **Index-sequential file**

    Ordered sequential file with a clustering index

    - **Dense Index Files** - index record appears for every search-key value in the file (e.g. IDs)

    - **Sparse Index Files** - index records for only some search-key value (records must be sequentially ordered on search-key)

      To locate a record with search-key value K:

        1. Find index record with largest search-key value <= K
        2. Search file sequentially starting at the record to which the index record points

      Compared to dense indices:

        - Less **space** and **maintenance overhead** for insertions and deletions
        - Generally **slower** than dense index for **record location**

      A good **trade-off** would be to have a sparse index with an entry for every block in file, corresponding to the least
      search-key value in the block - takes advantage of spatial locality to restrict the sparsity to an efficient point
      (worst case scenario a whole block is searched, as opposed to a regular sparse index, where the whole file could be searched)

- **Non-clustering (or non-clustered) index**

  An index whose search key specifies an order different from the sequential order of the file, generally referring to a
  field which is not the search-key of the clustering index.

  These indices have to be **dense**, and can be seen as an extra level of abstraction to the actual data.

Sequential scan using clustering index is **efficient**, but a sequential scan with a non-clustering index is expensive,
as each access may fetch a new block from disk, since each consecutive entry in the non-clustering index can point to different
blocks in disk, due to the fact that it does not retain the original order of the table (consecutive entries in the clustered index
will probably be within the same block)

Indices offer substantial benefits when searching for records, but updating these imposes overhead on the database, since every index
on the file must be updated when the file is modified.

### Index Updating

#### Deletion

If deleted record was the only record in the file with its particular search-key value, the search-key is also deleted from the
index

  - **Dense indices**

    Deletion of search-key is similar to record deletion

  - **Sparse indices**

    If an entry for the search-key exists in the index, it is deleted by replacing the entry in the index with the next
    search-key value in the file (in search-key order)

    If the next search-key value already has an index entry, the entry is deleted instead of being replaced

#### Insertion

Perform a lookup using the search-key value appearing in the record to be inserted

  - **Dense indices**

    If the search-key value does not appear in the index, insert it

  - **Sparse indices**

    If index stores an entry for each block of the file, no changes need to be made, unless a new block is created, in which
    case the first search-key value appearing in the new block is inserted into the index

### Multilevel indices


If index file does not fit in memory, it becomes expensive (instead of computationally cheap) as it requires a lot more
disk accesses. To fight this tendency (the more data there is, the bigger the index file), another level of abstraction is needed,
treating the index file as a sequential file, and creating an index file for the index file:

- The **outer** index is a sparse index of the index file
- The **inner** index is the original index file

If the outer index also becomes too large, another level has to/should be created.

Self-evidently, indices at all levels must be updated on insertion or deletion from the file

### B<sup>+</sup>-Tree Index Files

B<sup>+</sup>-tree indices are an alternative to indexed-sequential files

- **Advantages of B<sup>+</sup>-tree index files**

  - Automatically reorganizes itself with small local changes in the face of insertions and deletions

  - Reorganization of entire file is not required to maintain performance

- **Disadvantages of sequential-indexed files**

  - Performance degrades as file grows, since many overflow blocks are created

  - Periodic reorganization of entire file is required

- **Disadvantages of B<sup>+</sup>-tree index files**

  - Extra insertion and deletion overhead, space overhead

Advantages of B<sup>+</sup>-tree index files far outweigh the disadvantages and, as such, they are extensively used

#### B<sup>+</sup>-tree Node Structure


**Typical node**

  |--|
  | P<sub>1</sub> | K<sub>1</sub> | P<sub>2</sub> | ... | P<sub>n-1</sub> | K<sub>n-1</sub> | P<sub>n</sub>|

- **K<sub>i</sub>** = search-key values, ordered
- **P<sub>i</sub>** - pointers to **children** (for **non-leaf** nodes), or pointers to **records/buckets** of records (for **leaf** nodes)

##### Leaf Nodes

For *i*= 1, 2, ..., n-1, pointer *P<sub>i</sub>* points to a file record with search-key value *K<sub>i</sub>*

If *L<sub>i</sub>* and *L<sub>j</sub>* are leaf nodes and *i < j*, *L<sub>i</sub>*'s search-key values are less than,
or equal to, *L<sub>j</sub>*'s search-key values

A leaf node has between ***⌈(n-1)/2⌉*** and ***n-1***

*P<sub>n</sub>* points to next leaf node in search-key order

##### Non-leaf Nodes

These form a **multi-level sparse index** on the leaf nodes

Each node that is *not* a **root** or **leaf** has between ***⌈n/2⌉*** and ***n*** children, where n is fixed for a particular tree

Number of pointers in a node is called **fan-out** of the node

For a non-leaf node with *n* pointers:
  - All the search-keys in the subtree to which *P<sub>1</sub>* points are less than *K<sub>1</sub>*
  - For *2 <= i <= n-1*, all the search-keys in the subtree to which *P<sub>i</sub>* points have values greater than or equal
    to *K<sub>i-1</sub>* and less than *K<sub>i</sub>*
  - All the search-keys in the subtree to which *P<sub>n</sub>* points have values greater than or equal to *K<sub>n-1</sub>*

[B<sup>+</sup> tree example]({{site.baseurl}}/study-wiki/data-administration-in-information-systems/examples/b+-tree/)

### Properties

- Rooted tree

- All paths from root to leaf are of the same length

- Each node that is *not* a **root** *nor* a **leaf** has between ***⌈n/2⌉*** and ***n*** children

- A **leaf** node has between ***⌈(n-1)/2⌉*** and ***n-1*** values

- Special cases

  - If the root is not a leaf, it has at least 2 children

  - If the root is a leaf, it can have between *0* and *n-1* values

#### Observations

- The non-leaf levels of the tree form a hierarchy of sparse indices

- The tree contains a relatively small number of levels

  - Level below root has at least 2 * ⌈n/2⌉ values
  - Next level has at least 2 * ⌈n/2⌉ * ⌈n/2⌉ values
  - ...

- If there are K search-key values in the file, the tree height is no more than ***⌈log<sub>⌈n/2⌉</sub>(K)⌉*** and thus searches
can be conducted efficiently

- Insertions and deletions to the main file can be handled efficiently, as the index can be restructured in logarithmic time

### Queries

**find(value V)**

````text
  1.  C = root
  2.  While C is not a leaf node
  3.      Let i be the least value such that V<=Ki
  4.      If no such value exists
  5.          C = last non-pull pointer in C
  6.      Else if V == Ki
  7.          C = P(i+1)
  8.      Else
  9.          C = Pi
  10. Let i be the least value such that Ki == V
  11. If there is such a value i, follow pointer Pi to the desired record
  12. Else no record with search-key value V exists
````

#### Query properties

If there are *K* search-key values in the file, the height of the tree is no more than ***⌈log<sub>⌈n/2⌉</sub>(K)⌉***

A node is generally the same size as a disk block, typically 4 kb

  - *n* is typically around 100 (40 bytes per index entry)

With 1 million search key values and *n* = 100

  - at most ***⌈log<sub>⌈50⌉</sub>(1,000,000)⌉*** = **4** nodes accessed at lookup

    Notice the contrast with the balanced binary tree, which access **20** nodes per lookup. Each node access can be expensive,
    as it may require a disk I/O.

### Updates

#### Insertion

1. Find the leaf node in which the search-key would appear

2. If the search-key value is already present in the leaf node

    - Add record to the file
    - If necessary add a pointer to the bucket

3. If the search-key value is not present

    - Add the record to the file (and create a bucket if necessary)
    - If there is room in the leaf node, insert (key-value, pointer) pair in the leaf node
    - Otherwise, **split** the node (along with the new (key-value, pointer) entry)

##### Splitting a leaf node

1.  Take the n (search key, pointer) pairs (including the one being inserted) in sorted order. Place the first *⌈n/2⌉* in the original node,
and rest in a new node

2.  Let the new node be *p*, and *k* the least key value in *p* - insert *(k,p)* in the parent of the node being split

3.  If the parent if full, split it and propagate the split further up

    This split proceeds further upward until a node that is not full is found (the worst case causing the root to be split, increasing tree height by 1)

##### Splitting a non-leaf node

Same as leaf node, except the last element from the "old" node is "pushed" to the parent

#### Deletion

Remove the value, merge under-full nodes (without at least n/2 values, rounded up), and "fix" the upper level's pointers

### B<sup>+</sup> Tree File Organization

Index file degradation is solved by using B<sup>+</sup> tree indices

Data file degradation is solved by using **B<sup>+</sup> tree file organization**

  - The leaf nodes in a B<sup>+</sup> tree file organization store records, instead of pointers to records

  - Leaf nodes are still required to be half full

    - Since records are larger than pointers, the maximum number of records that can be stored in a leaf node is less than
    the number of records that can be stored in a leaf node is less than in a non-leaf node

  - Insertion and deletion are handled in the same way as insertion and deletion of entries in B<sup>+</sup> tree index

  - Good space utilization is particularly important since records use more space than pointer. This is achieved by using
  sibling nodes to aid in the redistribution during splits and merges

    E.g. using 2 siblings for redistribution results in each node having at least *2n/3* entries (rounded down)

### Record relocation and non-clustering indices

If a record moves, all non-clustering indices that store pointers to the record have to be updated

Node splits in B<sup>+</sup> tree file organizations become very expensive (due to involving several blocks of a non-clustering index, and thus
a large number of I/O operations)

**Solution**: use clustering index search key instead of record pointer in a non-clustering index

  - Extra traversal of clustering index to locate record

    - Higher cost for queries, but node splits are cheaper


### Indexing strings

Variable length strings as keys

  - Variable fan-out  
  - Strings can be long so low fan-out and high trees

Use **space utilization** as criterion for splitting, not number of pointers

Solution for increasing fan-out: **Prefix compression**

  - Search key values at internal nodes can be prefixes of full search key
  - Keep enough characters to distinguish entries in the subtrees, separated by the key value (e.g. Silas and Silberchatz can be separated by Silb)

### Bulk loading and bottom-up build

Inserting entries one at a time into a B<sup>+</sup> tree may require a random read and write operation per entry

  - Assuming leaf does not fit in memory and index is non-clustering
  - Can be very inefficient for loading a large number of entries at a time into the index (**bulk loading**)

An efficient way of performing bulk loading of the index:

  - Sort index entries first (using efficient and external-memory sort algorithm on the search key of the index)
  - Scan the file
  - Insert index entries in sorted order
    - Insertion will go to existing page (or cause a split)
    - Much better I/O performance, but most leaf nodes are left half-full

Another efficient way is bottom-up B<sup>+</sup> tree construction, starting from the leaves

  - As before, sort entries
  - Break sorted entries into blocks keeping them as full as possible
  - Create tree layer by layer, starting with leaf level
  - Implemented as part of bulk-load utility by most database systems

### B Tree Index Files

Similar to B<sup>+</sup> tree, the B tree allows search key values to appear only once so it eliminates redundant storage of search keys

Search keys in non-leaf nodes appear nowhere else in the B tree

  - An additional pointer field for each search key in a non-leaf node must be included

|--|
| Pros | Cons |
| :--: | :--: |
| May use less tree nodes than a corresponding B<sup>+</sup> tree | Only small fraction of all search key values are found early |
| Sometimes possible to find search key value before reaching leaf node | Non-leaf nodes are larger, so fan-out is reduced. Thus, B trees typically have greater depth than corresponding B<sup>+</sup> tree |
| | Insertion and deletion more complicated than in B<sup>+</sup> tree |
| | Implementation is harder than B<sup>+</sup> trees |

Typically the advantages of B trees do not outweigh the disadvantages

## Multiple-key Access

Assume the following query:

```sql
 select ID
 from instructor
 where dept_name = "Finance" and salary = 80000;
```

With 2 indices, one for `dept_name` and another for `salary`.

Possible strategies for processing query with indices on **single** attributes:

  1. Use index on `dept_name` to find instructors with department name "Finance" and test `salary = 80000`

  2. Use index on `salary` to find instructors with a salary of 80000 and test `dept_name = "Finance"`

  3. Use index on `dept_name` to find pointers to all records pertaining to the "Finance" department. Use the index on
  salary in a similar way. Take the obtained intersection of both sets as the query result.

These are (most of the time) very inefficient (for cases such as the one above). As such, **composite search keys** are
needed - these are keys with more than one attribute.

Composite search keys are lexicographically ordered:

```text
(a1, a2) < (b1, b2) iff :
  a1 < b1 or
  (a1 = b1 and a2 < b2)
```

The reasoning behind composite search keys is to minimize the fetch of unnecessary records, but it may also fetch
unnecessary records by itself, if queries only have one (or part) of the composite search key's attributes. As such,
their usage is only justified on tables that perform queries with all the indices frequently enough to outweigh the added
cost for lower attribute count queries.

## Covering Indices

Based on storing the value of extra attributes along with the pointers in an index entry so (some) queries can avoid fetching
the actual records -- particularly useful for non-clustering indices

Can store extra attributes only at leaf level
- Differs from multiple-key index, as it reduces the size of the search key and thus allows a larger fan-out in the non-leaf
nodes

For example:

```text
Non-clustering index on ID of the "instructor" relation also storing the value of the "salary" attribute
```

That would allow us to answer queries that require the salary without accessing the instructor relation

## Static Hashing

**Bucket** -- unit of storage containing one or more records
  - Typically a disk block

In a **hash file organization** we obtain the bucket of a record directly from its search-key value using a hash function

  - **Hash function** *h* is a function from the set of all search key values *K* to the set of all the buckets *B*

    Used to locate records for access, insertion and deletion

    Records with different search key values may be mapped to the same bucket and, as such, the whole bucket has to be
    searched sequentially to locate a record

Hashing can be used for both file **and** index organization  

### Hash functions

Worst hash function maps all search-key values to the same bucket, making access time proportional to the number of search
keys

The *ideal* hash function is

  - **Uniform**

    Each bucket is assigned the same number of search-key values from the set of all possible values

  - **Random**

    Each bucket will have the same number of records assigned to it regardless of the actual distribution of search key
    values in the file

*Typical* hash functions perform computations on the internal binary representation of the search key. E.g., for a string
search key, compute the sum of all the characters in the string and then returns the sum modulo the number of buckets

### Handling bucket overflows

Bucket overflows can occur because of:

  - **Insufficient buckets**

    If the number of records *n* is known, the number of buckets must be *n/f*, where *f* is the number of records that fit
    in a bucket

  - **Skew in distribution** of records due to:

    Multiple records having the same search key value

    Chosen hash function produces non-uniform distribution of key values

The probability of bucket overflow can be reduced, but not eliminated -- this is handled by overflow buckets

#### Overflow chaining

Overflow buckets of a given bucket are chained together in a linked list (**closed** hashing)

### Deficiencies

Function *h* maps search key values to a fixed set of *B* bucket addresses. But, databases grow or shrink with time:

  - If the initial number of buckets is too small, and file grows, performance will degrade due to too many overflows

  - If space is allocated for antecipated growth, a significant amount of space will be wasted initially (and buckets will be under-full)

  - If database shrinks, space will again be wasted

One solution is the periodic re-organization of the file with a new hash function. This is expensive, and disrupts normal operations

A better solution is the use of [dynamic hashing](#dynamic-hashing)

## Hash Indices

A **hash index** organizes the search keys, with their associated record pointers, into a hash file structure

Strictly speaking, hash indices are always **secondary** indices:
  - If the file itself is organized using hashing, a separate clustering hash index on it using the same search key is unnecessary
  - The term hash index refers to both non-clustering index structures and hash organized files

## Dynamic Hashing

Good for databases that grow or shrink with time

**Extendable hashing**

  - Hash function generates value over a large range (typically *b*-bit binary integers, with *b*=32)

  - At any time use only a **prefix** of the value returned by the hash function as an offset in a table of **bucket addresses**

  - Let the length of the prefix be *i* bits, 0 <= *i* <= 32

    - Bucket address table size = 2<sup>*i*</sup>
    - Initially *i* = 0
    - Value of *i* grows and shrinks as the size of the database grows and shrinks
    - *i* appears over the bucket address table and indicates that *i* bits of the hash value are **required** to determine the correct
    bucket for a certain search key value

  - Consecutive entries in the bucket address table may point to the same bucket

    - All have a common hash prefix but its length may be less than *i*
    - An integer ***i<sub>j</sub>*** representing the length of the **common hash prefix** is associated to each bucket *j*
    - All the entries that point to the same bucket have the same values on the first *i<sub>j</sub>* bits
    - The number of bucket addresses table entries that point to bucket *j* is *2<sup>(i-i<sub>j</sub>)</sup>*

  - The number of buckets changes dynamically due to coalescing and splitting of buckets -- this reorganization is applied to only one
  bucket so performance overhead is low

### Usage of Extendable Hash Structure

#### Locating a bucket with search key K<sub>i</sub>

1. Compute *h(K<sub>i</sub>) = X*

2. Use the *first i* **high order** bits of *X*, look at the table entry for this bit string, and follow the pointer to appropriate bucket

#### Inserting a record with search key K<sub>i</sub>

1. Locate the bucket, *j*, that will contain the record

2. If there is room in the bucket *j* insert the record in the bucket

  Else bucket must be split and redistribute current records plus the new one

    - The system must first determine from the hash value whether it needs to increase the number of bits that it uses

##### Bucket splitting

- If *i > i<sub>j</sub>* (more than one pointer to bucket *j*):

  1. Allocate a new bucket *z*, and set *i<sub>j</sub> = i<sub>z</sub> = (i<sub>j</sub> + 1)*
  2. Leave the first half of bucket address table entries as they were, pointing to bucket j and set the remaining entries to point to
  newly created bucket *z*
  3. Re-hash each record in bucket *j* and allocate it to *j* or *z*, depending on the first *i* bits
  4. Compute hash value for *K<sub>i</sub>* and insert record in the appropriate bucket (further splitting is required if the bucket is
  still full)

- If *i = i<sub>j</sub>* (only one entry in the bucket address table points to bucket *j*)

  1. The system needs to increase the size of the bucket address table to include pointers to the two buckets resulting for *j* splitting
  2. If *i* reaches some limit *b*, or too many splits have happened in this insertion, create an overflow bucket
  3. Else
    1. Consider an additional bit of the hash value
    2. Increment *i* by 1 and double the size of the address table
    3. Replace each entry in the table by two entries that point to the same bucket
    4. Now *i > i<sub>j</sub>* so use the first case above

#### Deleting a record with search key value K<sub>i</sub>

1. Locate it in its bucket, *j*, and remove it
2. The bucket itself can be removed if it becomes empty (with appropriate updates to the bucket address table)
3. Coalescing of buckets can be done

  Only with a *buddy* bucket having the same value of *i<sub>j</sub>* and the same *i<sub>j</sub> - 1* prefix, if it is present

4. Decreasing the bucket address table size is also possible, but is an expensive operation and should be done only if the number of
buckets becomes much smaller than the size of the table

### Pros/cons

|--|
| Benefits | Disadvantages |
| :------: | :-----------: |
| Hash performance does not degrade with growth of file | Extra level of indirection to find desired record |
| Minimal space overhead (no buckets need to be reserved for future growth) | Changing size of bucket address table is an expensive operation |
| | Bucket address table may itself become very big (larger than memory) -- solved by using a B+ Tree structure to locate desired record in bucket address table |

**Linear hashing** is an alternative mechanism:

  - Allows incremental growth of its directory (equivalent to bucket address table)
  - At the cost of more bucket overflows

## Ordered Indexing vs Hashing

Hashing is generally better for **equality queries**:

  - Ordered indices take a time proportional to the log of the number of values in the relation for the attribute involved in the equality

  - Hash index takes a constant average look-up time

While ordered indices are bettwe for **ordered queries**

  - No notion of next bucked in sorted order in hash structures

In practice, hashing is not widely used:
  - PostgreSQL supports it, but discourages use due to poor performance
  - Oracle supports static hash organization, but not hash indices
  - SQLServer supports only B+ Trees

## Index definition in SQL

[RTFM](https://www.w3schools.com/sql/sql_create_index.asp)

## Bitmap Indices

Special type of index designed for efficient querying on multiple keys

Records in relation are assumed to be numbered sequentially from a number, commonly 0.
  - Given a number *n* it must be easy to retrieve record *n*
  - Particularly easy if records are of fixed size

Applicable on attributes that take on a relatively small number of distinct values (gender, country, ...)

A **bitmap** is simply an *array of bits*

A bitmap index on an attribute A consists of one bitmap for each value that A can take
  - Bitmap has as many bits as records
  - In a bitmap for value *v*, the bit for a record is 1 if the record has the value *v* for that attribute, and 0 otherwise.

### Utility of Bitmap Indices

Bitmap indices are useful for queries on **multiple attributes** -- but they don't provide much, if any, gain for single attribute queries.

Queries are answered using **bitmap operations**:
  - Intersection (bit-wise and)
  - Union (bit-wise or)
  - Complementation (not)

Each operation takes two bitmaps of the same size and applies the operation on corresponding bits to get the result bitmap

### Observations

Bitmap indices are generally **very** small compared to the relation.

Deletion needs to be handled properly:

  - **Existence bitmap** to indicate if there is a valid record at a record location
  - Needed for complementation:

    ````text
    not(A=v): (NOT bitmap-A-v) AND ExistenceBitmap
    ````

Should keep bitmaps for all values, even **null** -- to allow operations in SQL with null, such as `NOT (A=NULL)`

### Efficient Implementation

- **Bitmaps are packed into words**

  - A single bit-wise `AND` can compute the intersection of 32 or 64 bits at once

    - Two bitmaps for a relation with 1 million records can be and-ed with just 31,250 instructions

      1M/32 = 31,250 (Assuming the `AND` intersected only 32 bits at once, would be half the instructions if using 64 bits)

  - Counting number of 1s can be done fast by a trick:

    - Use each byte to index into a pre-computed array of 256 elements, each storing the count of 1s in the binary representation

      Can use pairs of bytes to speed up even more, at the cost of more memory

    - Add up the retrieved records

  - Bitmaps can be used instead of *Tuple-ID* lists at **leaf** levels of B+ Trees, for values that have a large number of matching records.

    This is worthwhle if more than 1/64 of the records have that value, assuming a tuple-id is 64 bits. This technique merges the benefits of bitmap and B+ tree indices.

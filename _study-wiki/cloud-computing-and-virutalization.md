---
layout: subpage
title: Cloud Computing and Virtualization
sidebarClass: sidebar
navbar:
    - Back: study-wiki
---

# Cloud computing as an Utility #

Illusion of infinity resources on demand:

* 1 CPU x 100h = 100 CPU x 1h

Removal of any a priori commitment

* no or very low initial costs
* reduce CapEx (capital expenditure), convert to OpEx

Small granularity payments

* computing paid by CPU hour, web request, storage access, or bandwidth used

Shared hosting (one server with multiple websites)

Virtual dedicated server

* Resource sharing among different websites on same machine
* Possibly proportional to payment

Managed dedicating hosting

* One server per website with partial admin rights
* For good QoS

Dedicated hosting: one server per client (simple and flexible)

Collocated hosting: client owns the machine (provider guarantees network QoS)

Cluster hosting: multiple rented machines (for scalability)

Grid hosting: Multiple geographically distributed and replicated machines (for scalability, latency/speed, fault tolerance)

# Successes of Cloud Computing #

Scalability, grow as you go along
* grow the company (start ups with no H/W risk)
* grow the application 

Utility aspects
* no system admins
* low granularity payments

Varied development paradigms
* VMs, web apps, etc

# Problems of Cloud Computing #

* Availability
* Lock-in
* Privacy and auditing
* Cost of data transfer
* Performance reliability
* Scalable storage
* Large scale bugs
* Scale-out time
* Reputation propagation
* Compatible licensing

# Abstraction #

Complexity in computer systems (hw/sw)

Abstraction hides details
* key to manage complexity
* simplified interface to underlying resources
* approach = levels of abstraction + well-defined interfaces

## Well-defined interfaces ##

Examples:
* Instruction sets
* OS system calls
* Libraries
* Byte-code format

Advantages:
* Decoupling
* Independence from changes in internal details
* vendor independence
* parallel development
* diversity: competing abstractions favour innovation

Disadvantages:
* Interfaces are confining
* may reduce interoperability
  * subsystems designed for one interface do not work with others
  * assumption that oS has full control over hw
* very restrictive specially in networked environment
* limited flexibility, lock-in, security and failure isolation

Solution?

* keep advantages and avoid disadvantages
* virtualization: mapping of interfaces

## Virtualization ##

Isomorphism
* virtual guest, real host
* state mapping
* emulation

Virtualization vs abstraction
* abstraction is also an isomorphism
* virtualization does not necessarily hide details (maintains similar state size and number of operations)

Examples:
* Virtual hard disks
* VMs
* VMWware with Linux guest running on Windows host
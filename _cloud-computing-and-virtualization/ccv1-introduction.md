---
layout: cloud-computing-and-virtualization
title: Introduction
sidebarlinks:
  - Home: introduction
  - Motivation for Cloud Computing: motivation-for-cloud-computing
  - The Cloud Ecosystem: the-cloud-ecosystem
  - Motivation for Virtualization: motivation-for-virtualization
  - Virtual Machine Basics: virtual-machine-basics
  - Process VMs: process-vms
  - Systems VMs: systems-vms
  - Applications of VMs: applications-of-vms
---

# {{page.title}}

---

## Motivation for Cloud Computing

### Cloud Computing as an Utility

Seeing computational resources (CPU quantity, time and so forth) as an utility rather than a resource which *forces* maintenance
costs. There *can* be a lot of downtime on that "resource", which leads to needless expenditure from the company -- thus
resulting in lower profits. Due to this issue of being **fully responsible** (hiring works to maintain it, optimizing its
CPU usage, ...) for the machine, Cloud Computing brings a lot of advantages to the table:

- *Illusion* of infinite resources **on demand**

  ````text
  1 CPU x 100h = 100 CPU x 1h
  ````

  A provider of Cloud Services has hundreds, if not thousands, of machines ready to be used. Having this many machines
  on a company entails possibly *massive* costs, even if we only consider the electric bill,
  causing it to be an unpractical approach to scalability inside the company itself,
  to have a big amount of machines ready to be used to shorten the response time of some service.

- Removal of *a priori* commitment

  - No (or very low) initial costs
  - Reduce CapEx (capital expenditure), convert to OpEx (operation expenditure)

  This drives the previous point home. The *a priori* commitment is something that usually slows down the growth of a
  company, specially in the initial phases (just the initial cost of the machines can be a big load on the shoulders of a startup),
  by draining (most of the time unnecessarily) the company's capital

- Small granularity payments

  Computing paid by CPU per hour, web request, storage access, or bandwidth used. This *drastically* reduces the cost
  of providing a service, by paying nothing (or close to nothing) when the its not being used.

### Cloud Computing as an Extension of Web Hosting

- Shared hosting

  One server with multiple websites

  This is both an advantage and a disadvantage: on one hand it saves a lot of resources to both the company and the cloud
  service provider; on the other hand, if one website cause the server to fail, or is under attacks such as DDoS, it may
  cause the whole server to crash, and with it the other websites.

- Virtual dedicated server

  Resource sharing among different websites on the same machine. Resources allocated to a specific website mey be proportional
  to payment

Cloud Service providers allow for multiple types of Web Hosting:

  - **Managed Dedicated Hosting**

    One server per website with partial admin rights

  - **Dedicated Hosting**

    One server per client (simple and flexible)

  - **Collocated Hosting**

    Client owns the machine (provider guarantees network QoS)

  - **Cluster Hosting**

    Multiple rented machines (for scalability)

  - **Grid hosting**

    Multiple geographically distributed and replicated machines (for scalability, latency/speed, fault tolerance)

## The Cloud Ecosystem

- **Delivery Models**

  - Software as a Service (SaaS)
  - Platform as a Service (PaaS)
  - Infrastructure as a Service (IaaS)

- **Infrastructure**

  - Distributed Infrastructure
  - Resource virtualization
  - Autonomous systems (automatic scaling and load balancing, for example)

- **Resources**

  - Compute and storage servers
  - Networks
  - Services
  - Applications

- **Deployment Models**

  - Public cloud
  - Private cloud
  - Community cloud
  - Hybrid cloud

- **Defining attributes**

  - Massive infrastructure
  - Utility computing (Pay per usage)
  - Accessible via the Internet
  - Elasticity

As with all things, Cloud Computing has its pros and cons:

### Pros

- **Scalability** - grow as you go along

  Grow the company - startups with no H/W risk

  Grow the application - as the application needs more resources, more are allocated to it by the provider

- **Utility**

  No sysadmins

  Low granularity payments

- **Varied development paradigms**

  VMs, web apps, etc

### Cons

1. Availability
2. Lock-in (hard/costly to change cloud service providers)
3. Privacy and auditing
4. Cost of data transfer (related to auditing)
5. Performance reliability
6. Scalable storage
7. Large scale bugs
8. Scale-out time
9. Reputation propagation
10. Compatible licensing

## Motivation for Virtualization

- Why Virtual Memory?

  Relocatable, sharing/protection, larger address spaces, working set

- Why VirtualPC, VMWare, Xen, KVM, QEMU?

  Side-by-side Linux and Windows, virtual appliances (OS+applications)

  Reliability, checkpointing, migration, support for legacy systems

- Why Java VM, .NET, Python, PHP?

  Interoperability, application sharing, mobile code, sandboxing, garbage collection, code optimization,
  development productivity

- Why Virtual Storage, Virtual I/O?

  Replication, flexibility, low cost sharing, data migration, ***undoing***, better management

- Why Virtual Private Network (VPN)

  Communication security on top of unsecure network

## Virtual Machine Basics

### Abstraction

Abstraction hides details, being the key to managing complexity. It is a simplified interface to underlying
resources, and the approach to managing the ever-growing complexity of a computer system is *several* levels of abstractiong and well-defined interfaces.

### Well-defined interfaces (Instructions sets, System calls, libraries, ...)

|--|
| Advantages | Disadvantages |
| :--------: | :-----------: |
| Decoupling | Interfaces are confining - you are stuck with it, and if it changes, you too have to change along with it |
| Independence from changes in internal details | May reduce interoperability - consequence to confining, if one system was designed on top of/for an interface it *won't* work with others |
| Vendor independence | Very restrictive specially in networked environment - yet another consequence/side-effect of confining, the dependency in interfaces in this environment implies a *huge* butterfly effect, where applications built upon applications built upon interfaces will all depend on the interface and be subject to its changes/problems |
| Parallel development | Limited flexibility, lock-in, security and failure isolation |
| Diversity - competing abstractions favour innovation | |

The preferred application of these interfaces, which are obviously essential to computer systems, despite
their flaws, comes from keeping its most important advantages (complexity management, foster innovation
development productivity), and avoiding its disadvantages, trying to preserve interoperability and allow
flexibility.

The solution to this issue comes from Virtualization, which is roughly defined as the **mapping of interfaces**

### Virtualization

Isomorphism:

  - Virtual **guest**, real **host**
  - State-mapping
  - Emulation
    - Sequences of operations

Virtualization vs abstraction:

  - Abstraction is *also* an isomorphism
  - Virtualization does *not* necessarily hide details (maintains a similar state size and number of operations)

### Computer System Interfaces

#### Instruction Set Architecture (ISA)

Division between hardware and software, composed by:

  - **User-level** ISA

    CPU instructions visible to applications

  - **System-level** ISA

    CPU instructions visible only to supervisor software. Can, and most likely does, include user-level ISA

Decoupling/Confinement trade-off:

  - Software built for a specific ISA runs on ***any*** hardware that implements the same ISA, but ***only*** on those.

#### Aplication Binary Interfaces (ABI)

Mediates accesses of application software to the system where it executes:

  - Hardware resources
  - Core/basic services

Components:

  - User-level ISA
  - **System calls** to the OS
    - OS functions performed by request of applications
    - Validate security, resource management, etc

Decoupling/confinement trade-off:

  - Application binaries compiled run unmodified on ***any*** system with the same ISA and OS, but
  ***only*** there (no support for recompilation, i.e. binary portability)

#### Application Programming Interface (API)

- Hides details of implementations of OS services

- Addressed to application developers

- Defined with respoect to a high-level language (HLL)

Components:

  - Standard library that invokes OS services

    Key component, defined at the source code level

  - Can include user-level CPU instructions

Decoupling/confinement trade-off:

  - Applications developed with a specific API can be compiled on ***any*** platform providing the same
  API, but ***only*** on those (recompilation required, i.e. source-code poratability)

### Machine: a Matter of Perspective

#### Process Perspective

The machine is OS and user-level H/W

- Logical memory address space assigned to the process
- User-level registers and instructions for code execution
- I/O visible through OS, via system calls
- **Transient**: exists only during process execution

ABI provides interface between process and machine

#### OS Perspective

The machine is the underlying hardware alone

- System: full execution environment = many processes + users
- All processes share file system and I/O resources
- OS is part of the system
- **Persistent**: survives processes and reboots

ISA provides interface between system and machine

## Process VMs

Capable of supporting an **individual** process

Virtualization located at **ABI interface** (on top of OS and hardware)

Emulates user-level **ISA** and OS **system-calls**

Virtualizing software: *runtime*

[Examples](../examples/process-vms/)

## System VMs

Provides a complete system environment

Virtualization located at ISA interface
  - On top of hardware, allows access to I/O, networking, display
  - Alternative approach: hosted VM (VM on top of another *host* OS)

Emulates user and system ISA of guest hardware
  - While alive, VM supports OS with users and processes

Virtualizing software: virtual machine monitor (VMM)
  - defined in early VM concept (1960s)

[Examples](../examples/system-vms/)

## Applications of VMs

- **Emulation**
  - Emulating one ISA (ISA-2) with another (ISA-1)
  - Cross-platform portability

- **Replication**
  - Single hardware appears as multiple platforms
  - Support multiple instances of the same simultaneously on a single platform

- **Composition of VMs**
  - Running multiple different platforms on a single platform
  - Combining different VM types (e.g. JVM over VMWare)

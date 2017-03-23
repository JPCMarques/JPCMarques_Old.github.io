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

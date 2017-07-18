---
layout: enterprise-integration
title: Service Oriented Integration
sidebarlinks:
  - Home: service-oriented-integration
---

# {{page.title}}

---

## What is SOA?

There is no formal definition; there is, however, a fairly consensual definition:

    SOA is an architecture based on the notion that the assests of Information Systems in an organization are described
    and exposed as services. These services can be composed and orchestrated in business processes.
{: style="font-style: italic;"}

SOA is not linked to any technology. In practice, however, it is associated with service-oriented technologies such as
WS, SOAP, BPEL, WSCI, UDDI, XML, HTTP,...

## Level of Abstraction of Services

Only when concepts are considered at a business level there is a chance that they are reusable, otherwise programmers 
invariably create new artifacts because its **easier** to make new code than trying to understand existing one.

If these concepts are not clear and well-defined, business processes that consume them cannot be easily modeled.

SOA and Object-Oriented analysis and design are similar, with a clear change of granularity

As technology evolved, so did software architecture. Chronologically:

1. Structure design (Yourdon 1975)
    - Focus on structured functional software
    
2. Object-oriented development (Booch 1990)
    - Focus on aggregating data and functions in classes and objects, maintaining the principle of information hiding
    - Focus on the definition of methods and interfaces and their separation of implementation
    
3. Component based development (Szyperski 1998)
    - Focus on aggregating classes/objects to form "artifacts" of greater granularity
    - Focus on the definition of interfaces as contracts. The basis of CORBA, DCOM, etc
    
4. Service oriented development

    - Focus on business services and interfaces that enable reusability
    - Focus on mechanisms that allow the combination of services in business processes
    - Focus on full interoperability
    
This evolution is evidence of the increasing need of code reusability, to speed up development and reduce its cost dramatically,
in order to be able to respond to the market needs.

## Characteristics of a service

- Encapsulates a business function

- Explicitly defined with interfaces that are **independent** of implementation, and thus reusable

- **Loosely coupled** and invoked through communication protocols that are independent of the location

  Restricts the amount of information that a client application needs to know about the invoked service
  
  In a strongly coupled service any modifications on the client or server implies changing the code of both
  
  Loosely coupled services does not mean you can't enforce policies on the invocation to comply with non-functional requirements,
  such as security, atomicity, etc.
  
- Connectionless

  The client and the server dont need to maintain state between successive invocations
  
  A key issue is to define behaviour that should eliminate the problem by designing a service that doesn't depend on implicit shared
  knowledge 
  
  The service can handle a business request with or without state, but its interface should be connectionless using technology 
  that does not imply the existence of handles

- Can be aggregated and factored

- Offered in a single site

  After a business function has been modeled as a service,
  
    - Each service is instantiated in a **single** site and evoked on this site by *all* applications that use it (**no replicas** with
    potential independent development)
    
    - There is ***no*** inheritance or strong dependencies between services
    
    - Each service is created (built) once but can be deployed to all systems that require it
  
- Can be composed or orchestrated

  There are still useful and reusable services of lower granularity (read a DB, sign a document,...), and these services 
  aren't business processes but should be a part of the service architecture, and thus there is a need for a tool for orchestratiing
  services in order to reuse them to build coarse business services
  
  **Composition**
  
    - The composition of services requires the definition of collaboration activities and data-exchange messages between
    involved Web Services
    
    - These interactions may be stateless, synchronous, or asynchronous
    
    - Web Services are formally described by a WSDL
    
      - This description does not go beyond the interaction between the client and the web service
      
      - These relations are inadequate to express, model, and describe the complex compositions of multiple Web Services
      in business activities, which usually consist of several messages exchanged in a well-defined order
      
      - Consequently, another programming is needed

    - The aggregation of services could be programmed in an Object Oriented Language
    
      The issue with this, besides being fixed im the code, is that programming involves numerous details such as processing
      parameters, invocation of web services, etc. that obscure the process of business programming
      
    - Composition is not by inclusion as tends to be in programming languages because it is needed greater agility and structures
    loosely coupled
    
    - Closely resembles the execution of pipelines in UNIX where aggregate invocations of services create a new activity
    
    - BPEL is a language for describing the pipeline sequence of invocation of services and the transfer of data between messages
    or data structures normally in XML
    
- Coarse grained

  Granularity must be high so that the definition of a service encapsulates and busness function sufficiently well to be
  reusable.
  
  The definition of services and their granularity is one of the difficult issues in SOA

- Dynamically discovered and linked

- Enable auto recovery faults

- Self contained and modular interfaces

- Transparent location

## Comparison with component based architectures

|--|
| Component based | Service based |
| :-------------: | :-----------: |
| Procedural model (function invocation) | "Collaborative" model/event-driven (aimed to supply/service consumption) |
| Product more rigid (built to last) | Product more flexible (built to change) |
| long development cycles | Incremental development and deployment |
| Promotes the development of applications isolated and independent (*niche* applications) | Promotes the development of integrated solutions |
| Components tightly coupled | Components loosely coupled |
| Communication model: Object oriented | Communication model: message oriented |
| Focus on implementation (how does it do X?) | Focus on abstraction (what does it do?) |
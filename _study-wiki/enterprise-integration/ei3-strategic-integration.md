---
layout: enterprise-integration
title: Strategic Integration
sidebarlinks:
  - Home: strategic-integration
  - Strategic approaches to integration
---

# {{page.title}} #

---

Enterprise integration is complex, and can't be bought like other goods - it involves restructuring the whole company.

Its focus i to increase efficiency and effectiveness of the processes that drive the business, speeding up processes can't happen
by a simple integration of a couple of applications, it takes time to get results

The evolution of the integration happens over time in successive projects that reuse the integration infrastructure

Thus, if the company is going to be become an **integrated company**, a **strategy** is needed.

However, it is not always possible to have strategic integration due to factors such as:

  - Investment being too high
  - Company not having the required dimension
  - IT system being centered in an ERP
  
In these cases, a **tactical integration** should be made, which consists in selecting the integration technology with the lowest
cost that is able to fulfill the requirements

## Strategic Approaches to Integration ##

---

Strategies can be classified according to what they aim to improve:

- **Redundancy management**

  Reduce redundant information, systems and applications in the organization
  
- **Skill set management**

  Reduce the number of technologies in which it is mandatory to have competences for development or support
  
- **Reusability**

  Reuse existing applications or systems
  
They can also be classified on what their integration architecture is based upon:

- **Process driven** - (BPI) based on the business processes
  
  Defines all integrations in terms of BP, normally cross-organization, independent of applications and data stores
  
  Processes are modeled and may be analyzed and simulated independently from the applications
  
- **Service Oriented** - (SOA) based on the reusability of common services 

  Defines the relevant business services that are reusable and application independent
  
  Services should be coarse-grained, loosely coupled and connectionless
  
These two approaches are considered best practices because they are focused on:

|--|
| **SOA** | **Both** | **BPI** |
| :-: | :-: | :-: | 
| Main goal of services is to identify the assets relevant for the business processes, which in turn eliminates information redundancies, duplicated functionality on applications, etc | Use the service bus and BPMS to reduce the number of technologies | Visibility of the business processes and their metrics, allowing the business people to understand the processes, rules, and metrics |
| Focused on reusing existing information assets, database information, application services, external services | | BPI and BPM analysis of end-to-end business process focused on costumer |
  
Particular attention must be given to the selection of technology and service suppliers:

  - Standards are crucial because they promote reusability and allow eventually the replacement of suppliers
  - Suppliers in a strategic integration are determinant because of the larger timespan of projects
    
    Approaches for selecting suppliers include:
    
    - **Best of breed** - the most advanced technology
    - **Unique** software and service supplier
    - Choosing the platform of integration regardless of service supplier
    - Preferred suppliers for technology
    
Main areas of strategic integration architecture based on SOA/BPI:

- **Process architecture**

  Describes the processes that cross application boundaries and provide an integrated business process view

- **Service View**

  Describes services that support the business and are consumed by the BP
  
  Services must be large grain, loosely interconnected, reusable
  
- **Information**

  Provides a common vision of the organization's data independent of the applications and used in the integration 
  
  Metadata allows to correlate and maintain the data integrity in integration
  
- **Technical Integration**

  Defines the underlying integration technologies
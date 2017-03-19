---
layout: enterprise-integration
title: Legacy Applications
sidebarlinks:
  - Home: enterprise-integration
  - The Problem: the-problem
  - Integration of Legacy Applications: integration-of-legacy-applications
  - File Integration: file-integration
  - Screen Scraping: screen-scraping
  - Database Integration: database-integration
  - Tiered Architectures: tiered-architectures
---

# {{page.title}} #

---

## The problem ##

---

Usually a company has several **Legacy Applications** (applications used outside of their originally intended purpose) that
are essential for it to remain fully functional.

Thus, it is imperative to find a way to integrate these applications into the company's ecosystem.

**Possible solutions**

  1. An **ERP** (**E**nterprise **R**esource **P**lanning) as a central system where all applications are integrated
  
      - All functionality is migrated to the ERP
      - No ERP fits all the needs
      - Development costs can be significant
      - Loses its package structure
  
  2. A **data warehouse** to integrate the data from different applications
  
      - Useful to have integrated views of the business data on the Legacy Applications
      - Not a solution for the development of new processes and functionalities
      
  3. Maintaining the existent applications and do the necessary integrations
  
      The only viable choice, as it allows extension of a Legacy Application's functionality, and its integration into
      with other applications (Legacy or otherwise).

## Integration of Legacy Applications ##

---

There are mainly 3 methods of integration for Legacy Applications, each with their own pros and cons, and, as such, should be used 
where they fit the needs best. Of course, integration *isn't* restricted to a single method and, depending on the situation,
it can be beneficial to use more than one.

### File integration ###

This is by far the most widely used method. It operates in 3 phases: 

  1. Encoding
  2. File Transfer
  3. Decoding

Modeling languages, such as XML, strongly promoted the usage of this method, as it solves file heterogeneity by introducing a common
and easy to use standard, despite requiring tools to encode/decode the file in XML format.

**Pros**

  - *Universal* - all OSes and programming languages support files
  - Easy to transfer remotely (e.g. FTP)
  - Integration tools typically have a mechanism for transferring and transforming files with various formats
  
**Cons** 

  - Complexity of encoding/decoding increases exponentially with complexity of data to transfer
  - Limited performance
  
### Screen Scraping ###

Based on extraction of information directly from the UI of an application, also with a 3-phase operation:

  1. Define the screens to use
  2. Create a template indicating input and output fields
  3. Replace the terminal with a system that simulates a user, sending and receiving data from each screen
  
**Pros**

  - Suitable for integration with applications without internal information (all the *relevant* information is presented in its UI)
  - Application is not altered
  - Application data is not accessed
  
**Cons**

  - The UIs were not designed to enable integration
  - Its difficult for a program to emulate an user
  - The UI may be volatile
  - Low performance
  - Can be unstable due to communication problems, server availability, ...
   
### Database Integration ###

Based on using the data produced by the Legacy Application, present in a database, to be processed and transformed in order
to be used by another database.

**Pros**

  - Simple both in Windows and Java platforms (ODBC and JDBC)
  - Relatively low cost because it doesn't require rewriting applications
  - Many DBMS manufacturers provide drivers 

**Cons**

  - A large organization may have hundreds of databases making it difficult to integrate all of them
  - Requires to have technical knowledge on database repositories because the operation can have serious consequences on
  the information
  - Data types can be different and there is need to transform them
  - The data is not validated by the application
  - Strong coupled applications - any changes affect the integration
  - Replicated data can become inconsistent
  
These three methods do not separate the application's components, and instead treat it as a whole. This provides less control, 
and limits the choice of integration methods that can be applied.

As such, a more "integration-friendly" way of seeing the application is needed to *properly* integrate it.

### Tiered Architectures ###


Applications can be seen as having three main layers:

  - Presentation
  - Application Logic
  - Resource Management

The tiered architectures are based on grouping (or not) the layers, physically separating them and treating them as different entities.

#### 1-tier  ####

Our starting point, where the application is this huge black box which produces some output, 
or processes information in some way, that we need.

This limits our options, and makes it harder to integrate the application into the ecosystem of the company.

#### 2-tier ####

This architecture separates the Presentation Layer from the Application Logic and Resource Management layers, in a Client-Server relationship
(where the Client "holds" the Presentation Layer and the Server the other two).

This enables for processes such as **RPC**, **RMI**, or more complex methods, such as **Web Services**, to take place

The architecture for Web Services is (relatively) simple:

  - A directory service for the registration and search services - **UDDI**
  - A request/response protocol for service invocation - **SOAP**
  - A service interface specification - **WSDL**
  
As always, WSes have some cons. One of them, the most prominent of all, being the fact that new applications could be 
developed by creating a client that integrates with existing services. It sounds good, but is a bad thing, due to the fact that:

  - The new application needs to know several independent APIs
  - Any server change will affect the new application causing a butterfly effect that will ripple throughout all applications
  that are integrated in this way
  
#### 3-tier ####

All the layers are separated. This allows for the opportunity of having a middleware capable of supporting the integration
of business process, without affecting how the application(s) is(are) presented, or how the data is managed, making the application
easily extended and integrated to tailor to the company's needs.

#### N-tier ####

Allows to have recursively systems where tiers behave as client and servers
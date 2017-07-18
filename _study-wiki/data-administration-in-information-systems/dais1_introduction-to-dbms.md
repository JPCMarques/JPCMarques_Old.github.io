---
layout: data-administration-in-information-systems
title: Introduction to DBMS
sidebarlinks:
  - Home: introduction-to-dbms
  - Purpose of DBMS: purpose-of-dbms
  - Data abstraction levels: data-abstraction-levels
  - Data models: data-models
  - Data independence: data-independence
  - Instances and Schemas: instances-and-schemas
  - SQL: sql
  - Transaction management: transaction-management
  - Database users: database-users
  - DBMS structure: dbms-structure
---

# {{page.title}} #

---

## Purpose of DBMS ##

---

### DBMSs (**D**ata**b**ase **M**anagement **S**ystems) ###

Collection of interrelated data and set of programs to access the data stored in a database, which contains relevant information
about a particular enterprise/enterprise, that provides an environment that is convenient and efficient to use.

#### Database applications ####

Databases are used in (almost) every application. Anything that manages persistent information will most likely resort to
database usage (be it remotely or in the application's environment itself). Some examples include:

* Banking (transactions)
* Airlines (reservations, schedules)
* Universities (registrations, grades)
* Sales (customers, products, purchases)
* Manufacturing (production, inventory, orders, supply chain)
* Human resources (employee records, salaries, tax reductions)

#### File systems and DBMS ####

One of the earliest, less robust, and more primitive forms of data storage are **file systems**, which have multiple drawbacks:

* **Data redundancy and inconsistency**
  
  Multiple file formats, duplication of information in multiple files
  
* **Difficulty in accessing data**
  
  Each new task requires a program to be created, thus introducing unnecessary overhead
  
* **Data isolation**

  Multiple files and formats
  
* **Integrity problems**

  Due to the difficulty of data access, integrity constraints become part of the program's code, forcing the developer to rebuild
  the program every time a new one is needed or an old one need updating/removal.
  
* **Update atomicity**

  Failures may leave database in an inconsistent state with partial updates carried out
  
* **Lack of concurrency**

  Due to the increasing volume of data accesses needed in a modern application, concurrency plays a major role in
  performance. Not only does it have to be implemented in addition to the application's code, it can lead to inconsistencies
  if poorly done.
  
* **Security Problems**

  File systems's security (by default) is very lacking, and data security is very dependant on the machine it's held
  in

A DBMS solves these issues (it is designed to do so), by supplying to the programmer:

* Data independence and efficient access
* Data integrity and security
* Uniform data administration
* Concurrent access and crash recovery

and thus reducing the application development time as a natural consequence, as the programmer won't have to implement
these features (for the database).

## Data abstraction levels ##

---

There are 3 levels of data abstraction:

* **Physical**

  Describes how data is stored in the database
  
* **Logical**

  Describes the data and how it relates to other data in the database
  
* **View level**

  Applications may hide details of data types. Data can also be hidden for security purposes
  
These levels of abstraction can also be defined by who typically uses them: DBMS' developers, Application developers
and Application users, for the physical, logical, and view level, respectively.

## Data models ##

---

Collection of conceptual tools used for describing data, its semantics and constraints, as well as its relationship
with other data. Some examples:

* **Entity-Relationship model**

  Used to describe the metadata of a database
  
* **UML class diagram**

  Used to describe data structures in applications, and the relationship between them
  
* **Relational model**

  Also used to describe the metadata of a database
  
## Data Independence ##

---

Applications are blind to how the data is structured and stored; **logical** and **physical** data independence refer 
to the protection from changes to the logical and physical structure of data, respectively.


## Instances and Schemas ##

---

A **Schema** is the logical structure of the database, one description of a particular collection of data using a specific
data model (~ Java classes). Can be physical or logical, depending on what abstraction level the database is designed
in.

An **Instance** is the actual content of the database at a particular point of time.

## SQL ##

---

A relational DMBS provides a **DDL** (Data Definition Language) and a **DML** (Data Manipulation Language) as part
of a single DB language, SQL.

Most widely used declarative query language (user does not need to specify how to obtain the data, only what data is 
needed, as opposed to procedural where both need to be specified).

DDL compiler generates a set of tables stored in a **data dictionary**, which essentially contains metadata

## Transaction Management ##

---

A transaction is a collection of operations that perform a single logical function in a database application

The component of transaction management ensures that the database remains in a consistent state despite system failures and 
transaction failures

These transactions *must* have **ACID** (**A**tomicity, **C**onsistency, **I**solation and **D**urability) properties

## Database users ##

---

Users are differentiated by the way they interact with the system:

* **Application programmers** through DML calls
* **Sophisticated users** through form requests in a database query language
* **End users** through invocation of applications previously written
* **Database administrator** coordinates all activities of the database system, *must* have a good understanding of the
enterprise's information resources and needs

  Is in charge of:
  * Schema definition
  * Storage structure and access method definition
  * Schema and physical organization modification
  * Granting user authority to access the database
  * Specifying integrity constraints
  * Acting as liaison with users
  * Monitoring performance, tuning the system and responding to changes in requirements
  
## Database tuning##

---

Making a database application run more quickly (with higher throughput, even at the cost of response time for time-critical
applications)
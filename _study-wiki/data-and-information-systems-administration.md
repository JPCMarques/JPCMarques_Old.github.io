---
layout: subpage
title: Database Management Systems
sidebarClass: sidebar
navbar:
    - Back: study-wiki
---

[refs]: c1 silber and ragu

<div id="Purpose "></div>

# Purpose of Database Management Systems #

---


A DBMS is a collections of interrelated data and set of programs to access the data.

DB contain relevant information about a particular enterprise/organization

DBMS provides and environment which is efficient and convenient to use

## Issues of file systems for data storage ##

* Data redundancy and inconsistency (multiple formats, duplication of information in diff files)
* Difficulty in data access (need a new program for each new task)
* Data isolation (multiple files and formats)
* Integrity (integrity problems become part of program code, making it hard to add new ones)
* Atomicity of updates 
* Concurrent access
* Security

## Why a DBMS? ##

* Provides independent data and (much more) efficient access to that data. 
* Since a DBMS removes the need to control data from the application itself, it reduces application development time.
* Data integrity and security (obviously reducing development time), through usage of mechanisms such as Data Abstraction
* Uniform data administration ????
* Concurrent access and crash recovery (namely through atomicity of access)

## Levels of Data Abstractions ##

### Physical level ###

Describes how data is stored

### Logical level ###

Describes data stored in the database, and the relationships among the data

### View level ###

Application programs may hide details of data types; views can also hide information for security purposes

## Data models ##

A collection of conceptual tools for describing data, relationships among them, their semantics and constraints

## Data Independence ## 

Applications are insulated from how data is structured and stored

**Logical data independence** - protection from changes in the logical structure of data
**Physical data independence** - protection from changes in the physical structure of data

## Instances and Schema ## 

**Schema** - logical structure of the database, the description of a particular collection of data using a given data model 
(analogous to a class in java)
  * *Physical* and *Logical* schemas differ on what level they are designed in (physical or logical)
  
**Instance** - the content of the database at a particular point in time (analogous to the value of variable)

## SQL: Structured Query Language ##

A relational DBMS provides a DDL and a DML as part of a single DB language (SQL)

SQL is a declarative query language (user specifies what data is required, without specifying the method of access; 
in procedural languages the method is specified)

### DDL (Data Definition Language)###

DDL compiler generates a set of tables stored in a data dictionary, which essentially contains metadata

### DML (Data Manipulation Language)###

Language for accessing and manipulating data

## Transaction Management ## 

A transaction is a collection of operations that perform a single logical function in a database application

The transaction management component ensures that the database remains in a consistent state despite system and transaction failures

Transactions must be ACID (Atomic, Consistent, Isolated and Durable/persistent)

## Database Users ##

Users are differentiated by the way they expect to interact with the system

* Application programmers: interact with the system through DML calls
* Sophisticated users: form requests in a database query language
* Naïve/end users: invoke one of the permanent application programs that have been written previously
* Database administrator: coordinate all the activities of the database system, has a good understanding of the enterprise's information
resources and needs:
  * Schema definition
  * Storage structure and access method definition
  * Schema and physical organization modification
  * Granting user authority to access the database
  * Specifying integrity constraints
  * Acting as liaison with users
  * Monitoring performance, tuning the system and responding to changes in requirements
  
## Database Tuning ##

Activity of making a database application run faster (higher throughput, though it may mean lower response time for time-critical applications)
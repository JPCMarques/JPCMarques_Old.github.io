---
layout: data-administration-in-information-systems
title: Introduction to DBMS
navbar:
  - Purpose of DBMS: purpose-of-dbms
  - Data abstraction levels: data-abstraction-levels
  - Data models: data-models
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

#### File systems ####

One of the earliest, less robust, and more primitive forms of data storage are **file systems**, which have multiple drawbacks:

* Data redundancy and inconsistency
  
  Multiple file formats, duplication of information in multiple files
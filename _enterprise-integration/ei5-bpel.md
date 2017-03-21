---
layout: enterprise-integration
title: BPEL
sidebarlinks:
  - Home: bpel
  - Orchestrations: orchestrations
  - BPEL Elements: bpel-elements
  - Interface to the BPEL Process: interface-to-the-bpel-process-invoke-receive-and-reply
  - Synchronous and Asynchronous Operations: synchronous-and-asynchronous-operations
  - Oracle SOA Suite - SCA: oracle-soa-suite---sca-service-composite-application
  - Advanced BPEL: advanced BPEL
---

# {{page.title}}

---

A subset of **BPML** (**B**usiness **P**rocess **M**odeling **L**anguage), allows the definition of two types of processes:
  
  - Abstract processes - business protocol
  - Executable with detail of WS and XML
  
Supported by big industry names such as IBM, Microsoft, BEA, SAP, Siebel and Oracle

Basically specifies the format of an XML file that contains the definitions of an **orchestration**.

Processes interact with entities through Web Services (WSDL contracts)

## Orchestrations

When we define a BPEL process, we actually define a new service

  - Has its own WSDL
  - Is an orchestration
  
A BPEL process specifies the *exact* order in which participating services should be invoked
  
  - Relies on the WSDL description of the services invoked
  - Each step is called an **activity**, and these can have 2 types:
  
    - Basic activities
    - Structured activities

A BPEL process is exposed as a web service: it has to expose a port type that will be used by the client to start the process
and get the reply

## BPEL Elements

- **Partner links**

  External entities that interact with the process: partners, services
  
  Defined by *(one type, role)* (a role will correspond to a different service on WSDL)
  
  Services: 
  
    - To invoke the BPEL process
    - To be invoked by the BPEL process
    - That have both roles - invoked by the process and can be used to invoke the process
  
  The `<partnerLink>` element contains `myRole` and `partnerRole` attributes that establish the roles for the service process and its
  partner process. For example:
  
  ````xml
  <partnerLinks>
    <partnerLink name="bpelImplemented" partnerLinkType="ns0:loanRequestorPartnerLinkType" myRole="loanRequestor"/>
    <partnerLink name="objInvoked" partnerLinkType="ns1:loanProcessorEjbPartner" partnerRole="loanProcessorEJB"/>
  </partnerLinks>
  ````
  
- **Activities** 

  - **Basic**
  
    **Steps** in the execution that perform the work
    
      - Invoking other Web Services, using `<invoke>`
      - Waiting for the client to invoke the business process by sending a message, using `<receive>`
      - Generating a response for synchronous operations, using ``<reply>``
      - Manipulating data variables, using ``<assign>``
      
        Variables in ``<invoke>``, ``<receive>`` and ``<reply>`` specify the input and output messages for invoking 
        operations in partner services.
        
        To copy data between variables, expressions and partner link endpoint references, ``<assign>`` is used. Within
        it, one or more ``<copy>`` commands can be performed:
        
        ````xml
        <assign>
            <copy>
                <from .../>
                <to .../
            </copy>
            
            ...
        </assign>
        ````
        
      - Indicating faults and exceptions, using ``<throw>``
      - Waiting for some time, using ``<wait>``
      - Terminating the entire process, using ``<exit>``
  
  - **Structured**
  
    Organizes the sequence of **process control**
    
      - ``<sequence>`` for defining a set of activities that will be invoked in an ordered sequence
      - ``<flow>`` for defining a set of activities that will be invoked in parallel
      - Execution flow control: ``<if>``, ``<while>``, ``<repeatUntil>`` and ``<forEach>``
      - The ability to select one of a number of alternative paths, using ``<pick>``
      
    
- **Variables**

  Described by a WSDL document and/or XSD schema, used mostly to **pass state** between process and services
  
  When the business process invokes an operation and receives the result, we often want to **store** that result for 
  subsequent invocations, **use** the result as is, or **extract** certain data
  
  Variables can be of three types.
    - WSDL message types
    - XML schema elements
    - XML schema primitive types
    
  ````xml
  <variables>
    <variable name="InsuranceRequest" messageType="ins:InsuranceRequestMessage"/>
    <variable name="Some other variable" messageType="ins:someothertype"/>
    
    ...
  </variables>
  ````
  
- **XPath**

  We can access BPEL variables using XPath expressions (particularly useful in `<copy>` assignments)
  
  We access BPEL variables in XPath using the ``$`` operator, in general:
  
  ````xpath
  $variableName.messagePart/ns:node/ns:node...
  ````
  
  Or, in a more specific example, to access the LastName from the InsuredPersonRequest variable:
  
  ````xpath
  $InsuredPersonRequest.insuredPersonData/ins:LastName
  ````
  
- **XSLT transformations**

  We can use XSLT transformations to tranform the data stored in the PersonData variable and copy the result of the transfomation
  to the InsuredPersonRequest variable:
  
  ````xml
  <assign>
    <copy>
      <from>bpel : doXSLTransform ("http://packtpub.com/xslt/person.xsl", $PersonData)
      </from>
      <to variable="InsuredPersonRequest"/> 
    </copy>
  </assign>
  ```` 
  
## Interface to the BPEL process ``<invoke>``, `<receive>` and `<reply>`

All three activities use the same three basic attributes:

  - **partnerLink** - specifies which partner link will be used
  
  - **portType** - specifies the used port type
  
  - **operation** - specifies the name of the operation to invoke, to wait to be invoked, or the name of the operation
  which has been invoked but is asynchronous and requires a reply
  
### ``<invoke>``

When the business process invokes an operation on the service, it sends a set of parameters. These parameters are modeled 
as input messages with services. To specify the input message for the invocation, we use the ``inputVariable`` attribute
and specify a variable of the corresponding type.

If we invoke a synchronous request/response operation, it returns a result. This result is again a message, modeled as 
an output message. To store it in a variable, ``<invoke>`` provides another attribute, ``outputVariable``

````xml
<invoke partnerLink="insuranceA" 
        portType="ins:ComputeInsurancePremiumPT"
        operation="ComputeInsurancePremium"
        inputVariable="InsuranceRequest"
        outputVariable="InsuranceAResponse">
</invoke>
````

Translated to a more verbose format, the BPEL process invokes the synchronous operation ``ComputeInsurancePremium``,

  - On port type ``ins:ComputeInsurancePremiumPT``
  - Using the ``insuranceA`` partnerLink
  - Providing the input from the variable ``InsuranceRequest``
  - Storing the output in the ``InsuranceAResponse`` variable
  
## Synchronous and Asynchronous operations

**Synchronous**

A request is sent by the client and it waits for a response. Self-evidently, this should only be used on operations that 
don't take long to complete, being reasonable for the client to wait for it.

**Asynchronous**

Contrary to synchronous operations, these do not block the client after being called, and are typical of operations with 
an higher workload. If a response to the client is needed, a callback is usually performed.

## Oracle SOA Suite - SCA (Service Composite Applications)

The SOA Suite is about **composite** applications that expose services and possibly references -- dependencies on external
services that are to provided to the composite -- and that can easily be composed into more complex and functionally richer 
composites

The composite application contains **service components** -- BPEL processes -- that are *exposed as services*. From the 
outside, the service interface of this composite is the Web Service that is wired to the BPEL component in the SCA composite

Clients do *not* interact directly with the BPEL process -- they have no knowledge about the implementation of the service 
offered by the composite application, nor do they need that knowledge

### BPEL and Java

**Composite applications** -- collection of software artifacts that were aggregated to provide a certain capacity (in this
case to run BPEL processes)

The BPEL processes are bulished on a J2EE application server and run in the context of a composite application

## Advanced BPEL

### BPEL process lifecycle

BPEL processes are stateful and support long running interaction with a well-defined lifecycle.

For each interaction with the process, a process instance is created. Therefore, we can think of the BPEL process definition
as a template for creating process instances

These instances are not created explicitly: their creation is implicit, occurring when the process receives the initial message
that starts the process

  - This can happen within the ``<receive>`` or ``<pick>`` activities, so both provide an attribute called ``createInstance``.
  When set to yes, the occurrence of the activity causes a new instance of the business process to be created.
  
#### Activity lifecycle

- **Delays**

  Sometimes a business process may need to specify a certain delay:
  
    - Invoke an operation at a specific time
    - Wait for some time and then invoke an operation
    - Wait before we pool the results of a previously initiated
    - Wait between iterations of a loop
    
  These can specified by using the ```<wait>``` activity either for a specified period of time or until a certaim deadline is reached.
    
- **Concurrent activities** 

  Just use ``<flow>`` ¯\\\_(ツ)_/¯

- **Synchronization between concurrent activities**

  Specified using the ``<link>`` construct. For each link we specify a name. Links have to be defined within the ``<flow>`` activity
  
  For each BPEL activity, whether basic or constructed, we can specify two **standard** elements for linking activities 
  and expressing synchronization dependencies. These two standard elements are nested within the activity:
  
    - ``<source>`` is used to annotate an activity as being a source of one or more links
    - ``<target>`` is used to annotate an activity as being a target of one or more links
    
### BPEL Elements 

- **Faults**

  Can arise in various situations:
  
    - When a BPEL process invokes a synchronous web service operation, the operation might return a WSDL fault message,
    which results in a BPEL fault
    
    - A BPEL process can explicitly signal a fault:
    
      ````xml
      <throw faultname="name"/>
      ````
      
      A fault must be treated by a fault handler:
      
      ````xml
      <faultHandlers>
        <!-- Catch 1 -->
        <catch faultName="trv:TicketNotApproved">
          <!-- Perform an activity -->
        </catch>
        <!-- Catch 2 -->
        <catch faultName="trv:TicketNotApproved"
               faultVariable="TravelFault">
          <!-- Perform an activity -->
        </catch>
        <!-- Catch 3 -->
        <catch faultVariable="TravelFault">
          <!-- Perform an activity -->
        </catch>
        <catchAll>
          <!-- Perform an activity -->
        </catchAll>
      </faultHandlers>
      ````
      
      - Catch 1 is selected if the ``trv:TicketNotApproved`` fault has been thrown and carries no fault data
      
      - Catch 2 is selected if the ``trv:TicketNotApproved`` fault has been thrown and carries data of type `TravelFault`
      
      - Catch 3 is selected if a fault has been thrown whose fault variable type matches the ``TravelFault`` variable type
      and whose name is not ``trv:TicketNotApproved``
      
      - ``<catchAll>`` is selected in all other cases
    
    - A fault can be thrown automatically, for example, when a join failure has occurred
    
    - The BPEL server might encounter error conditions in the runtime environment, network communications, or any other 
    such reason. BPEL defines several standard faults

- **Scope**

- **Fault handlers**

  Handle exceptions in the execution of processes
  
- **Compensation**

  Allow a process to undo actions already undertaken, important for compensation of transactional activities
  
  Compensation, or undoing steps already performed in the business process, is one of the most important concepts in 
  business processes (imagine if you couldn't undo a misplaced 0 in a payment)
  
  In business processes, the compensation behaviour must be explicitly defined. Therefore, wehn defining the BPEL process,
  we would have to explicitly define how to compensate the activities than need compensation "routines".
  
  In BPEL, it is defined inside a compensation handler:
  
  ````xml
  <compensationHandler>
    <!-- Compensation activity/sequence of activities here-->
  </compensationHandler>
  ````
  
- **Correlation sets**

  Correlate multiple invocations of services, it is the equivalent of object references that allow to associate instances of 
  services to business processes
  
  A set of tokens are defined as properties shared by messages that relate to the same interaction
  
  Business processes use a stateful model.
  
  When a client starts a business process, a new instance is created. This instance lives for thge duration of the business
  process.
  
  Messages sent to the business process (using operations on port types and ports) need to be delivered to the correct
  instance of the business process. We would expect this to be provided by the runtime environment, such as a BPEL server.
  This is the case if an appropriate transport mechanism can be used, such as WS-Addressing.
  
  However, in some cases where several partners are involveld (for example if the BPEL process calls service A, which calls
  service B, and service B makes a direct callback to the BPEL process), or a lightweight transport mechanism is used that does
  not provide enough information to explicitly identify instances (such as JMS), manual correction is required.
  
  In such cases, we will have to use specific business data, such as flight numbers, social security numbers, chassis number, 
  and so on.
  
  BPEL provides a mechanism to use such specific business data to maintain references to specific business process instances and 
  calls this feature correlation
  
  Business data used for correlation is contained in the messages exchanged between partners. The exact location usually
  differs from message to message -- for example, the flight number in the message from the passenger to the airline might be in a different
  location than in the confirmation message from the airline to the passenger
  
  BPEL provides a notion of **message properties**, which allow us to associate relevant data with names that have greater
  significance than just the data types used for such data.
  
  To specify which data is used for correlation, message properties are used.
  
  Messages properties are defined in WSDL through the WSDL extensibility mechanism, similarly to partner link types.
  
  A set of properties shared by messages and used for correlation is called a **correlation set**:
  
  ````xml
  <correlationSets>

      <correlationSet name="VehicleOrder"
                      properties="tns:chassisNo tns:engineNo"/>

  </correlationSets>
  ````
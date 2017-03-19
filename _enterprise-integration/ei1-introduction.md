---
layout: enterprise-integration
title: Introduction
sidebarlinks:
  - Home: introduction
  - Business needs: business-needs
  - Change: change
  - IT and business competitiveness: it-and-business-competitiveness
  - Integration: integration
  - Porter's Model: porters-model
  - Law of the Diminishing Companies: law-of-the-diminishing-companies
---

# {{page.title}} #
---

## Business needs ##

---

### Change ###

---

Change is universal in life and organizations. What changed in it was its pace, accelerated by technological evolution, 
economy globalization, organizations' productivity, greater knowledge of workers, etc.

The **business cycle** changes to answer modifications on the external conditions, and its change has accentuated sharply, 
from decade to decade, since WW2, mostly due to four major driving forces:

* Digital innovation
* Competition
* Globalization
* Electronic value chains

### IT and business competitiveness ###

---

IT is fundamental to business competitiveness. It's a fact that most economic activities are deeply dependant on information technologies or IT. Initially, IT was limited to
automation of low-level tasks (storage, information processing, ...), but it has evolved to be nearly, if not completely,
all-encompassing of organizations' activities.
 
The most notable changes in organizations are in the following areas:

* **Client interaction**
* **Industrial production**
* **Business operations**
* **Business decentralization**
* **Real-time management**

#### Client interaction ####

Until recently, interaction with the client was made in person, introducing a major overhead in business processes. Today,
it is made through many channels, most of which not requiring human overseeing, removing most of the overhead of client 
interaction.
 
New channels are constantly being introduced, presenting multiple challenges, therefore forcing:

* a review of the existing client contact processes
* modification of internal processes that previously were not exposed to clients
* ensure different SLAs (Service-Level Agreements)

#### On demand industrial production ####

The traditional model of production for stock and distribution, through a pre-established relatively slow network, is gradually
being replaced by production tailored to the client, in near real-time.

The logistic chains became gradually more sophisticated to accommodate for the geographic dispersion of companies, due to
clients needing to served and invoiced faster.

In order to allow for these needs to be satisfied, business processes that connect the client to production must be digitized, 
as it is impossible to match computer response times with human intervention.

#### End-to-end business operations ####

Typically, companies were organized in functional departments, but that caused caused an inability to operate intense and
fast transactions between departments. Furthermore, as they were computerized, their difference in activities caused them 
to develop departmental information systems, different from each other.

To solve these issues, a more agile end-to-end approach to the business operations is required, as isolated silos of
information are highly inefficient, and that inefficiency can only be circumvented through integration.

In addition to the issues above, each silo has its own back office, which introduces another overhead (even though the
silos are essentially the same in structure and functionality).

#### Business decentralization ####

As a natural consequence of business expansion, organizations are more and more distributed:

* To be closer to markets (faster invoicing/RoI)
* Optimizing structural costs (lower cost to profit in different locations: e.g. its cheaper for a company to profit in China
if it has a branch there, instead of having to go through *more* middlemen)
* Forced by globalization (to answer a global demand, a distributed organization will generally be more efficient)

The decentralization of the organizations forces a decentralization of information systems, which must be handled with care
in order to maintain coherent internal processes and avoid geographical information silos - both cases introducing possibly *massive*
communication overhead.

As such, **system**, **application** and **information integration** is *essential* to support decentralization, as it allows
for entities with potentially very different internal structures to interact in the same manner (through an API, protocol, ...).

#### Real-time management ####

Achieving business agility requires that management is done in real-time, which means that the traditional management, where
information is updated in quarters or months, cannot reach the same adaptability as real-time, which in turn must have
access to the information almost immediately from the operational systems that generate it.

As a consequence, reporting and management tools **must** be integrated with the operational applications to enable real-time
management.

### Integration ### 

---

As times changed, so did the way integration was referred to. Chronologically,

* System Integration  
* Application Integration
* Enterprise Integration

#### System Integration ####

Ability to transfer information using data networks between systems, typically in simple formats, such as emails and files.

#### Application Integration ####

Needed from the moment when information managed or produced by an application is needed to implement the business process
of another application.

One of its main objectives is the removal of human interaction, which is error prone and introduces delays and, as such, 
unnecessary overhead.

Application integration requirement and the evolution of network technologies led to an intense technological development
in the second half of the 90's in the areas of distributed systems and application development platforms, both of which 
originating multiple platforms for application development and integration.

The market and industry selected a few of the many platforms introduced which became *defacto* standards or were endorsed
as standards by standardisation bodies.

##### Value Chains #####

Over time, each industry defined value chains (a chain of activities in the company that gives value to the clients).
The digitization of these chains between different companies enabled them execute the processes intra-companies electronically, 
improving their efficiency, security and reliability.

Evolution of the internet originated numerous integration possibilities, connecting (or enabling connection between) clients,
suppliers, partners, etc. Due to the obvious benefits of integration, most companies nowadays practice it, or are in the 
process of doing so. As such, to ensure competitiveness, a newly established company must also integrate its system.

Furthermore, integration allowed the operation of very complex value chains reliably and in a cost-efficient manner.

Supply chains are one type of value chains, more focused towards producing goods/service from the primary goods in a given industry.

#### Enterprise integration ####

As a consequence of the environment created by the aforementioned factors, for a company to survive in it it must structure
itself to be able to integrate all of its business processes, as well as control all external interfaces.

As such, Enterprise Integration can be defined as the creation of IT architecture which would allow for all its components
to cooperate with each other, unlike the traditional way where they would be confined within their own borders and seldom interact, 
as well as with the outside.

[Integration Case example]({{site.baseurl}}/study-wiki/enterprise-integration/examples/integration-case/)

### Porter's Model ###

---

A model for business analysis, it considers several forces conditioning the business on a given industry and have direct influence
on its competitiveness, as to determine if the business is among the ones that are more likely to be profitable, or if it
competes with products or services where margins are too small or may easily be substituted.

The forces in the (traditional) model are:

* Business power of buyers
* Business power of suppliers
* Competitiveness between companies active in the industry
* Possibility of new companies entering the business
* Possibility of product or service substitution

Due to the pressures of today's IT-driven economy, the model must thus be adjusted to accommodate for 3 new forces:

* **Digitization** 

  Two empiric laws explain how the market has become increasingly digitized and IT-dependant:

  * **Moore's Law**: each 18 months the processing power duplicates and the costs remain constant.
 
    * This is an evolution that never happened in other technologies
    * Justifies how computers went from being something that ony Governmental entities had access to, to something that 
    almost every tool has installed on it.
    * This evolution is widespread across all digital systems, to the point where processing power and communications costs
    are (almost) negligible, compared to how they once were.
  
  * **Metcalf Law**: the value of a network is a square function of its users
  
    The creation of a network can be a significant investment that may not be justifiable from a business plan analysis; 
    however, the pre-existing data networks, such as the Internet, nearly eliminate this cost fully, allowing for business
    models based on network aggregation (such as Facebook, Google, Amazon, ...)
  
* **Globalization**

  The market is becoming global, eliminating global borders:
  
    * Financial system has been globalized for decades
    * Logistic chains are globe-wide
    * Consumers are used to buying international products and services
    * Major industries are structured as multinational networks of production and distribution
  
* **Market deregulation**

  Government as a market player restricts competition in some areas (elimination of trade and administrative barriers, such as monopolies)
  
  Government highly regulates some activities (typically activities that may cause loss of life), though in many cases this
  is becoming an increasingly difficult task, as globalization is allowing competitors that are not subject to regulations
  to enter the market
  
### Law of the diminishing companies ###

---

Companies are created because the additional cost of for creating them, is less than the extra cost transactions would have 
if directly executed on the market.

Companies tend to execute many transactions internally, because their costs are smaller within the organizations than in the market 
(e.g. logistic networks, transportation and distribution, internal health services, ...)

Its self-evident that technology lowers internal transaction costs (faster transportation, remote communication, ...)

A company that is focused on a specific business will (generally) perform better than a department in another organization

The technology is making the market more efficient and faster, at a rate that companies by themselves cannot keep up with (**Disruption law**):

* Transaction costs may decrease faster on the market than inside companies
* Companies efficiently exploring technology will have less transaction costs than companies that don't adapt their value chains
to new technologies
* Companies that don't evolve (stale companies) easily gain new competitors with smaller transaction costs which in turn
will have better margins and the ability to present better offers


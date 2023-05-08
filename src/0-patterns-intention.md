## Not knowing what object implementations you’ll need ahead of time

- **Factory Method** - if an object needs to be instantiated in one go
- **Abstract Factory** - if multiple object needs to be instantiated in one go
- **Builder** - if an object needs to be built step-by-step

## Making several exact copies of a complex object

- **Prototype** - if you need to make a copy of an object that is already instantiated

## Using many instances of an object while keeping code running smoothly

- **Object pool** - facilitates the reuse of pre-instantiated objects
- **Flyweight** - allows you to have a very large number of similar objects without much performance penalty, but makes the code complicated
- **Prototype** - can be combined with Object Pool to make initial creation of the objects easier

## Using the same single instance of an object throughout the application

- **Singleton** - if you need to have a single instance of an object

## Third party components aren’t directly compatible with your code

- **Adapter** - if you need to use a third party (or legacy) component and don’t want to depend on it

## Adding new functionality to existing objects that cannot be modified

- **Decorator** - if you need to add new functionality to an object without changing its interface

## Accessing complex low-level logic from a high level layer

- **Facade** - simplifies the access interface to the complex logic
- **Proxy** - caches the result of expensive operations

## User interface and business logic are developed separately

- **Bridge** - suitable when front-end and back-end can be designed together up-front
- **Facade** - suitable when back-end is hosted by a third party or cannot be designed alongside the user interface up-front
- **Proxy** - prevents services outage during back-end redeployment

## Building a complex object hierarchy Composite Implementing complex conditional logic

- **Strategy** - facilitates a conditional one-off action
- **Factory Method** - facilitates a conditional creation of a long-lived object
- **Abstract Factory** - facilitates a conditional creation of multiple long-lived objects

## Multiple object instances of different types need to be able to communicate with each other

- **Mediator** - easier to implement when communication logic between different objects doesn’t expect to be changed
- **Observer** - easier to implement when communication between different objects is expected to change at runtime or during configuration

## Multiple stages of processing are needed

- **Chain of Responsibility** - suitable in scenarios where processing steps are pre-defined and a one-off logical flow is executed
- **Builder** - suitable in scenarios where the order of processing stages can be arbitrary and a reusable object is being built

## The system is controlled by complex combinations of inputs

- **Command** - generalizes the execution of a complex operation

## Ability to undo an action that has been applied

- **Memento** - allows you to store the exact snapshots of the state
- **Command** - allows you to revert by performing an opposite action

## Ability to traverse a collection without knowing its underlying structure

- **Iterator** - allows you to traverse a collection without knowing its underlying structure

## Creating a family of related algorithms

- **Template Method** - easy to implement, but might violate Liskov substitution principle
- **Visitor** - allows you to separate an object from its behavior and add many differential types of behavior to the objects
- **State** - allows you to change the behavior of an entire object in one go by changing the mode (state) that the object is in
- **Strategy** - suitable when algorithms are selected by conditional logic

> Sazanavets, Fiodar. The easiest way to learn design patterns: With JavaScript code examples on Node.js leanpub.com. Kindle.

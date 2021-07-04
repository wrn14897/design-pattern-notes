// Definition: The Decorator Pattern attaches additional
// responsibilities to an object dynamically.
// Decorators provide a flexible alternative to subclassing
// for extending functionality

interface Component {
  methodA: Function;
  methodB: Function;
}

class ConcreteComponent implements Component {
  methodA() {

  }

  methodB() {

  }
}

// Decorator
// Decorators implement the same interface or abstract class as the component
// they are going to decorate
abstract class DecoratorClass implements Component {
  // Each decorator HAS-A (wraps) a component, which means the decorator has
  // an instance variable that holds a reference to a component
  protected wrapperObj: Component;

  constructor(component: Component) {
    this.wrapperObj = component;
  }

  abstract methodA(): void;

  abstract methodB(): void;
}

class ConcreteDecoratorA extends DecoratorClass {
  methodA() {

  }

  methodB() {

  }

  newBehavior() {
    // access component state...
  }
}

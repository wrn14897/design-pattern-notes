abstract class AbstractClass {
  // Here's the template method. It's
  // declared final to prevent subclass
  // from reworking the sequence of steps
  // in the algorithm
  templateMethod() {
    this.primitiveOperation1();

    this.primitiveOperation2();

    this.concreteMethod();

    this.hook();
  }

  abstract primitiveOperation1(): void;

  abstract primitiveOperation2(): void;

  concreteMethod() {
    // implementation here
  }

  // We can also have concrete methods that do nothing by default;
  // we call these 'hooks'. Subsclasses are free to override these
  // but don't have to.
  // Use hooks when that part of the algorithm is optional
  hook() {}
}

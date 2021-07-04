abstract class Beverage {
  description: string = 'Unknown Beverage';

  getDescription() {
    return this.description;
  }

  abstract cost(): number;
}

class Espresso extends Beverage {
  constructor() {
    super();
    this.description = 'Espresso';
  }

  cost() {
    return 1.99;
  }
}

class DarkRoast extends Beverage {
  constructor() {
    super();
    this.description = 'Dark Roast';
  }

  cost() {
    return 0.99;
  }
}

class HouseBlend extends Beverage {
  constructor() {
    super();
    this.description = 'HouseBlend';
  }

  cost() {
    return 0.89;
  }
}

abstract class CondimentDecorator extends Beverage {
  protected beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  abstract getDescription(): string;
}

class Mocha extends CondimentDecorator {
  getDescription() {
    return this.beverage.getDescription() + ', Mocha';
  }

  cost() {
    return this.beverage.cost() + 0.2;
  }
}

class Soy extends CondimentDecorator {
  getDescription() {
    return this.beverage.getDescription() + ', Soy';
  }

  cost() {
    return this.beverage.cost() + 0.15;
  }
}

class Whip extends CondimentDecorator {
  getDescription() {
    return this.beverage.getDescription() + ', Whip';
  }

  cost() {
    return this.beverage.cost() + 0.1;
  }
}

// Open Startbuzz Coffee
const beverage1 = new Espresso();
console.log(`${beverage1.getDescription()} $${beverage1.cost()}`);
const beverage2 = new DarkRoast();
console.log(`${beverage2.getDescription()} $${beverage2.cost()}`);
let beverage3 = new HouseBlend();
beverage3 = new Soy(beverage3);
beverage3 = new Mocha(beverage3);
beverage3 = new Whip(beverage3);
console.log(`${beverage3.getDescription()} $${beverage3.cost()}`);

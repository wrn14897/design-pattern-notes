// Let's say we have to naive classes (Tea and Coffee)
class Coffee {
  prepareRecipe() {
    this.boilWater();
    this.brewCoffeeeGrinds();
    this.pourInCup();
    this.addSugarAndMilk();
  }
  
  boilWater() {
    console.log('Boiling water');
  }

  brewCoffeeeGrinds() {
    console.log('Dripping Coffee through filter');
  }

  pourInCup() {
    console.log('Pouring into cup');
  }

  addSugarAndMilk() {
    console.log('Adding Sugar and Milk');
  }
}

class Tea {
  prepareRecipe() {
    this.boilWater();
    this.steepTeaBag();
    this.pourInCup();
    this.addLemon();
  }

  boilWater() {
    console.log('Boiling water');
  }

  steepTeaBag() {
    console.log('Steeping the tea');
  }

  addLemon() {
    console.log('Adding Lemon');
  }

  pourInCup() {
    console.log('Pouring into cup');
  }
}

// 1. Move duplication code into a abstract class.
// 2. Since we know brewCoffeeeGrinds <-> steepTeaBag or
// addLemon <-> addSugarAndMilk are pretty analogous
// why not making up methods to handle it.
abstract class CaffeineBeverage {
  // our 'template' method
  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) {
      this.addCondiments();
    }
  }

  // brewCoffeeeGrinds <-> steepTeaBag
  abstract brew(): void;

  // addSugarAndMilk <-> addLemon
  abstract addCondiments(): void;

  boilWater() {
    console.log('Boiling water');
  }

  pourInCup() {
    console.log('Pouring into cup');
  }

  // hook
  customerWantsCondiments() {
    return true;
  }
}

// Then we refactor our old classes into...
class NewTea extends CaffeineBeverage {
  brew() {
    console.log('Steeping the tea');
  }

  addCondiments() {
    console.log('Adding Lemon');
  }
}

class NewCoffee extends CaffeineBeverage {
  brew() {
    console.log('Dripping Coffee through filter');
  }

  addCondiments() {
    console.log('Adding Sugar and Milk');
  }
}

const myTea = new NewTea();
myTea.prepareRecipe();

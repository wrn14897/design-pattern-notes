enum PizzaType {
  cheese = 1,
  veggie,
  clam,
  pepperoni,
}

interface Dough {}

interface Sauce {}

interface Cheese {}

interface Pepperoni {}

interface Veggie {}

interface Clam {}

class ThinCrustDough implements Dough {}

class MarinaraSauce implements Sauce {}

class ReggianoCheese implements Cheese {}

class Galic implements Veggie {}

class Onion implements Veggie {}

class SlicedPepperoni implements Pepperoni {}

class FreshClam implements Clam {}

interface PizzaIngredientFactory {
  createDough(): Dough;
  createSauce(): Sauce;
  createCheese(): Cheese;
  createVeggies(): Veggie[];
  createPepperoni(): Pepperoni;
  createClams(): Clam[];
}

class NYPizzaIngredientFacotry implements PizzaIngredientFactory {
  createDough() {
    return new ThinCrustDough();
  }

  createSauce() {
    return new MarinaraSauce();
  }

  createCheese() {
    return new ReggianoCheese();
  }

  createVeggies() {
    return [ new Galic(), new Onion() ];
  }

  createPepperoni() {
    return new SlicedPepperoni()
  }

  createClams() {
    return [ new FreshClam() ];
  }
}

abstract class Pizza {
  protected name: string;
  protected dough: string;
  protected sauce: string;
  protected toppings: string[];

  prepare() {
    console.log(`Preparing ${this.name}`);
    console.log('Tossing dough...');
    console.log('Adding sauce...');
    console.log('Adding topping:');
    for (const topping of this.toppings) {
      console.log(`    ${topping}`);
    }
  }

  bake() {
    console.log('Bake for 25 mins at 350');
  }

  cut() {
    console.log('Cutting the pizza into diagonal slices');
  }

  box() {
    console.log('Place pizza in official PizzaStore box');
  }

  setName(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

abstract class PizzaStore {
  orderPizza(pizzaType: PizzaType) {
    const pizza = this.createPizza(pizzaType);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }

  // factory method
  protected abstract createPizza(pizzaType: PizzaType): Pizza;
}

// concrete instances below
class NYStyleCheesePizza extends Pizza {
  constructor() {
    super();
    this.name = 'NY Style Sauce and Cheese Pizza';
    this.dough = 'Thin Crust Dough';
    this.sauce = 'Marinara Sauce';
    this.toppings = ['Grated Reggiano Cheese'];
  }
}

class NYPizzaStore extends PizzaStore {
  protected createPizza(pizzaType: PizzaType) {
    switch (pizzaType) {
      case PizzaType.cheese:
        return new NYStyleCheesePizza();
      default:
        throw new Error(`Unrecognized pizza type: ${pizzaType}`);
    }
  }
}

class ChicagoStyleCheesePizza extends Pizza {
  constructor() {
    super();
    this.name = 'Chicaco Style Deep Dish Cheese Pizza';
    this.dough = 'Extra Thick Crust Dough';
    this.sauce = 'Plum Tomato Sauce';
    this.toppings = ['Shredded Mozzarella Cheese'];
  }
}

class ChicacoPizzaStore extends PizzaStore {
  protected createPizza(pizzaType: PizzaType) {
    switch (pizzaType) {
      case PizzaType.cheese:
        return new ChicagoStyleCheesePizza();
      default:
        throw new Error(`Unrecognized pizza type: ${pizzaType}`);
    }
  }
}

// Pizza Test Drive
const nyStore = new NYPizzaStore();
const chicacoStore = new ChicacoPizzaStore();

let pizza: Pizza = nyStore.orderPizza(PizzaType.cheese);
console.log(`Ethan ordered a ${pizza.getName()}\n\n`);

pizza = chicacoStore.orderPizza(PizzaType.cheese);
console.log(`Joel ordered a ${pizza.getName()}\n\n`);


class UnsupportedOperationException extends Error {}

// Providing a default implementation of the methods so that
// if the MenuItem (the leaf) or the Menu (the composite) doesn't
// want to implement some of the methods, it can fall back on
// some basic behavior
abstract class MenuComponent {
  add(menuComponent: MenuComponent) {
    throw new UnsupportedOperationException();
  }

  remove(menuComponent: MenuComponent) {
    throw new UnsupportedOperationException();
  }

  getChild(i: number) {
    throw new UnsupportedOperationException();
  }

  getName() {
    throw new UnsupportedOperationException();
  }

  getDescription() {
    throw new UnsupportedOperationException();
  }

  getPrice() {
    throw new UnsupportedOperationException();
  }

  isVegetarian() {
    throw new UnsupportedOperationException();
  }
  
  print() {
    throw new UnsupportedOperationException();
  }
}

class MenuItem extends MenuComponent {
  private readonly name: string;

  private readonly description: string;

  private readonly vegetarian: boolean;

  private readonly price: number;

  constructor(name: string, description: string, vegetarian: boolean, price: number) {
    super();
    this.name = name;
    this.description = description;
    this.vegetarian = vegetarian;
    this.price = price;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getPrice() {
    return this.price;
  }

  isVegetarian() {
    return this.vegetarian;
  }

  print() {
    console.log(
      ` ${this.getName()}${
        this.isVegetarian() ? '(v)' : ''
      }, ${this.getPrice()}  -- ${this.getDescription()}`);
  }
}

class Menu extends MenuComponent {
  private readonly menuComponents: MenuComponent[];

  private readonly name: string;

  private readonly description: string;

  constructor(name: string, description: string) {
    super();
    this.name = name;
    this.description = description;
    this.menuComponents = [];
  }

  add(menuComponent: MenuComponent) {
    this.menuComponents.push(menuComponent);
  }

  remove(menuComponent: MenuComponent) {
    const index = this.menuComponents.indexOf(menuComponent);
    if (index !== -1) {
      this.menuComponents.splice(index, 1);
    }
  }

  getChild(i: number) {
    return this.menuComponents[i];
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  print() {
    console.log(`
      ${this.getName()}, ${this.getDescription()}
      -------------------------------------------
    `);
    for (const menuComponent of this.menuComponents) {
      menuComponent.print();
    }
  }
}

class Waitress {
  private readonly allMenus: MenuComponent;

  constructor(allMenus: MenuComponent) {
    this.allMenus = allMenus;
  }

  printMenu() {
    this.allMenus.print();
  }
}


// Test drive
const pancakeHouseMenu = new Menu('PANCAKE HOUSE MENU', 'Breakfast');
const dinerMenu = new Menu('DINER MENU', 'Lunch');
const cafeMenu = new Menu('CAFE MENU', 'Dinner');
const dessertMenu = new Menu('DESSERT MENU', 'Dessert of course!');

const allMenus = new Menu('ALL MENUS', 'All menus combined');
allMenus.add(pancakeHouseMenu);
allMenus.add(dinerMenu);
allMenus.add(cafeMenu);

// add menu items
dinerMenu.add(new MenuItem(
  'Pasta',
  'Spaghetti with Marinara Sauce, and a slice of sourdough bread',
  true,
  3.89,
));
dinerMenu.add(dessertMenu);
dessertMenu.add(new MenuItem(
  'Apple Pie',
  'Apple pie with a flakey crust, topped with vanilla ice cream',
  true,
  1.59,
));

const waitress = new Waitress(allMenus);
waitress.printMenu();

class MenuItem {
  private readonly name: string;
  private readonly description: string;
  private readonly vegetarian: boolean;
  private readonly price: number;

  constructor(name: string, description: string, vegetarian: boolean, price: number) {
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
}

interface Iterator {
  hasNext(): boolean;
  next(): MenuItem;
}

class DinerMenuIterator implements Iterator {
  private readonly items: MenuItem[];
  
  private position = 0;

  constructor(items: MenuItem[]) {
    this.items = items;
  }

  next() {
    const menuItem = this.items[this.position];
    this.position += 1;

    return menuItem;
  }

  hasNext() {
    if (this.position >= this.items.length || this.items[this.position] === undefined) {
      return false
    }

    return true;
  }
}

class DinerMenu {
  static readonly MAX_ITEMS = 6;

  private readonly menuItems: MenuItem[] = [];

  private numberOfItems = 0;

  constructor() {
    this.addItem(
      'Vegetarian BLT', 
      "(Fakin') Bacon with lettuce & tomato on whole wheat",
      true,
      2.99,
    );

    this.addItem(
      'BLT', 
      'Bacon with lettuce & tomato on whole wheat',
      false,
      2.99,
    );

    this.addItem(
      'Soup of the day', 
      'Soup of the day, with a side of potato salad',
      false,
      3.29,
    );
  }

  addItem(name: string, description: string, vegetarian: boolean, price: number) {
    if (this.numberOfItems >= DinerMenu.MAX_ITEMS) {
      console.error('Sorry, menu is full!!');
    }
    else {
      const menuItem = new MenuItem(name, description, vegetarian, price);
      this.menuItems.push(menuItem);
      this.numberOfItems += 1;
    }
  }

  // getMenuItems() {
  //   return this.menuItems;
  // }
  
  createIterator() {
    return new DinerMenuIterator(this.menuItems);
  }
  
  // other methods...
}

const dinerMenu = new DinerMenu();
const iter = dinerMenu.createIterator();
while (iter.hasNext()) {
  console.log(iter.next());
}

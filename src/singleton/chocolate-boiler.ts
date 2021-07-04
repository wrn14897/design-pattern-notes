class ChocolateBoiler {
  private empty: boolean = true;

  private boiled: boolean = false;

  isEmpty() {
    return this.empty;
  }

  isBoiled() {
    return this.boiled;
  }

  fill() {
    if (this.isEmpty()) {
      this.empty = false;
      this.boiled = false;
    }
  }

  drain() {
    if (!this.isEmpty() && this.isBoiled()) {
      // drain the boiled milk and chocolate
      this.empty = true;
    }
  }

  boil() {
    if (!this.isEmpty() && !this.isBoiled()) {
      this.boiled = true;
    }
  }
}


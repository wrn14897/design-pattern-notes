let uniqueInstance: Singleton = null;

class Singleton {
  // only Singleton can initiate this class!
  private constructor() {

  }

  static getInstance(): Singleton {
    if (uniqueInstance === null) {
      return new Singleton();
    }
    return uniqueInstance;
  }
}

console.log(Singleton.getInstance())

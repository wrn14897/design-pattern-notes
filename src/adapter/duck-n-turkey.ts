// A simple showcase of object adaptor

interface Duck {
  quack(): void;
  fly(): void;
}

class MallarDuck implements Duck {
  quack() {
    console.log('Quack');
  }

  fly() {
    console.log("I'm flying");
  }
}

interface Turkey {
  gobble(): void;
  fly(): void;
}

class WildTurkey implements Turkey {
  gobble() {
    console.log('Gobble gobble');
  }

  fly() {
    console.log("I'm flying a short distance");
  }
}

// class adaptor
// interface TurkeyAdaptor extends Duck, Turkey {

// }

// object adaptor (composition) -> composition over inheritance ?!
class TurkeyAdaptor implements Duck {
  private readonly turkey: Turkey;

  constructor(turkey: Turkey) {
    this.turkey = turkey;
  }

  quack() {
    this.turkey.gobble();
  }

  fly() {
    for (let i = 0; i < 5; i += 1) {
      this.turkey.fly();
    }
  }
}


const testDuck = (d: Duck) => {
  d.quack();
  d.fly();
};
const duck = new MallarDuck();
const turkey = new WildTurkey();
const turkeyAdaptor = new TurkeyAdaptor(turkey);

console.log('The Turkey says...');
turkey.gobble();
turkey.fly();

console.log('The Duck says...');
testDuck(duck);

console.log('The TurkeyAdaptor says...');
testDuck(turkeyAdaptor);

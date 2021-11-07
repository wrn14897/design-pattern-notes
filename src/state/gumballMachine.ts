interface State {
  insertQuarter: () => void;
  ejectQuarter: () => void;
  turnCrank: () => void;
  dispense: () => void;
}

class GumballMachine {
  noQuarterState: NoQuarterState;
  hasQuarterState: HasQuarterState;
  soldState: SoldState;
  soldOutState: SoldOutState;
  winnerState: WinnerState;

  private state: State;
  private count: number;

  constructor(numberGumballs: number) {
    this.noQuarterState = new NoQuarterState(this);
    this.hasQuarterState = new HasQuarterState(this);
    this.soldState = new SoldState(this);
    this.soldOutState = new SoldOutState(this);
    this.winnerState = new WinnerState(this);

    this.count = numberGumballs;
    if (numberGumballs > 0) {
      this.state = this.noQuarterState;
    }
    else {
      this.state = this.soldOutState;
    }
  }

  insertQuarter() {
    this.state.insertQuarter();
  }

  ejectQuarter() {
    this.state.ejectQuarter();
  }

  turnCrank() {
    this.state.turnCrank();
    this.state.dispense(); // internal action
  }

  setState(state: State) {
    this.state = state;
  }

  releaseBall() {
    console.log('A gumball comes rolling out the slot...');
    if (this.count > 0) {
      this.count -= 1;
    }
  }

  getCount() {
    return this.count;
  }

  getNoQuarterState() {
    return this.noQuarterState;
  }

  getHasQuarterState() {
    return this.hasQuarterState;
  }

  getSoldState() {
    return this.soldState;
  }

  getSoldOutState() {
    return this.soldOutState;
  }

  getWinnerState() {
    return this.winnerState;
  }
}

class NoQuarterState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log('You inserted a quarter');
    this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
  }

  ejectQuarter() {
    console.log("You haven't inserted a quarter");
  }

  turnCrank() {
    console.log("You turned, but there's no quarter");
  }

  dispense() {
    console.log('You need to pay first');
  }
}

class HasQuarterState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("You can't insert another quarter");
  }

  ejectQuarter() {
    console.log('Quarter returned');
    this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
  }

  turnCrank() {
    console.log('You turned...');
    const isWinner = Math.random() > 0.5;
    if (isWinner && this.gumballMachine.getCount() > 1) {
      this.gumballMachine.setState(this.gumballMachine.getWinnerState());
    }
    else {
      this.gumballMachine.setState(this.gumballMachine.getSoldState());
    }
  }

  dispense() {
    console.log('No gumball dispensed'); // inappropriate action
  }
}

class SoldState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("Please wait, we're already giving you a gumball")
  }

  ejectQuarter() {
    console.log('Sorry, you already turned the crank');
  }

  turnCrank() {
    console.log("Turning twice doesn't get you another gumball!");

  }

  dispense() {
    this.gumballMachine.releaseBall();
    if (this.gumballMachine.getCount() > 0) {
      this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    }
    else {
      console.log('Oops, out of gumballs!')
      this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
    }
  }
}

class SoldOutState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("You can't insert a quarter, the machine is sold out")
  }

  ejectQuarter() {
    console.log("You can't eject, you haven't inserted a quarter");
  }

  turnCrank() {
    console.log('You turned, but there are no gumballs');
  }

  dispense() {
    console.log('No gumballs dispensed');
  }
}

class WinnerState implements State {
  private gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("You can't insert a quarter, the machine is sold out")
  }

  ejectQuarter() {
    console.log("You can't eject, you haven't inserted a quarter");
  }

  turnCrank() {
    console.log('You turned, but there are no gumballs');
  }

  dispense() {
    this.gumballMachine.releaseBall();
    if (this.gumballMachine.getCount() == 0) {
      this.gumballMachine.setState(gumballMachine.getSoldOutState());
    }
    else {
      this.gumballMachine.releaseBall();
      console.log("YOU'RE A WINNER! You got two gumballs for your quarter");
      if (this.gumballMachine.getCount() > 0) {
        this.gumballMachine.setState(gumballMachine.getNoQuarterState());
      }
      else {
        console.log('Oops, out of gumballs!')
        this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
      }
    }
  }
}


// Test
const gumballMachine = new GumballMachine(5);
console.log(gumballMachine)
console.log(`Total gumballs: ${gumballMachine.getCount()}`);
gumballMachine.insertQuarter();
gumballMachine.turnCrank();
console.log(`Remaining gumballs: ${gumballMachine.getCount()}`);
gumballMachine.insertQuarter();
gumballMachine.turnCrank();
console.log(`Remaining gumballs: ${gumballMachine.getCount()}`);
gumballMachine.insertQuarter();
gumballMachine.turnCrank();
console.log(`Remaining gumballs: ${gumballMachine.getCount()}`);
gumballMachine.insertQuarter();
gumballMachine.turnCrank();

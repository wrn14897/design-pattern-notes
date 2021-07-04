/* Command interface */
interface Command {
  execute(): void;

  undo(): void;
}

/*
 * (Receiver)
 * Now, let's say you want to implement a command for turning a light on.
 * Referring to our set of vendor class, the 'Light' class has two methods: on() and off().
 * Here's how you can implement this as command:
 */
abstract class Vendor {
  protected readonly location: string;

  constructor(location: string) {
    this.location = location;
  }
}

class Light extends Vendor {
  on() {
    console.log(`Turning light on at ${this.location}!`);
  }
  off() {
   console.log(`Turning light off at ${this.location}!`);
  }
}

class LightOnCommand implements Command {
  light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.on();
  }

  undo() {
    this.light.off();
  }
}

class LightOffCommand implements Command {
  light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.off();
  }

  undo() {
    this.light.on();
  }
}

class Stereo extends Vendor {
  on() {
    console.log(`Turning stereo on at ${this.location}!`);
  }

  off() {
    console.log(`Turning stereo off at ${this.location}!`);
  }

  setCD() {
    console.log(`Setting CD for stereo at ${this.location}`);
  }

  setVolume(v: number) {
    console.log(`Setting volumne for stereo at ${this.location}`);
  }
}

class StereoOnWithCDCommand implements Command {
  stereo: Stereo;

  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }

  execute() {
    this.stereo.on();
    this.stereo.setCD();
    this.stereo.setVolume(11);
  }

  undo() {
    // Some implementations
  }
}

class StereoOff implements Command {
  stereo: Stereo;

  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }

  execute() {
    this.stereo.off();
  }

  undo() {
    // Some implementations
  }
}

// Example: using state to implement Undo
enum FanSpeed {
  HIGH,
  MEDIUM,
  LOW,
  OFF,
}

class CeilingFan extends Vendor {
  private speed = FanSpeed.OFF;

  high() {
    console.log(`Turning fan's speed into HIGH mode at ${this.location}`);
    this.speed = FanSpeed.HIGH;
  }

  medium() {
    console.log(`Turning fan's speed into MEDIUM mode at ${this.location}`);
    this.speed = FanSpeed.MEDIUM;
  }

  low() {
    console.log(`Turning fan's speed into LOW mode at ${this.location}`);
    this.speed = FanSpeed.LOW;
  }

  off() {
    console.log(`Turning fan off at ${this.location}`);
    this.speed = FanSpeed.OFF;
  }

  getSpeed() {
    return this.speed;
  }
}

class CeilingFanHighCommand implements Command {
  private readonly ceilingFan: CeilingFan;

  private prevSpeed: FanSpeed;

  constructor(ceilingFan: CeilingFan) {
    this.ceilingFan = ceilingFan;
  }

  execute() {
    this.prevSpeed = this.ceilingFan.getSpeed();
    this.ceilingFan.high();
  }

  undo() {
    switch (this.prevSpeed) {
      case FanSpeed.HIGH:
        this.ceilingFan.high();
        break;
      case FanSpeed.MEDIUM:
        this.ceilingFan.medium();
        break;
      case FanSpeed.LOW:
        this.ceilingFan.low();
        break;
      case FanSpeed.OFF:
        this.ceilingFan.off();
        break;
      default:
        break;
    }
  }
}

class CeilingFanOffCommand implements Command {
  private readonly ceilingFan: CeilingFan;

  private prevSpeed: FanSpeed;

  constructor(ceilingFan: CeilingFan) {
    this.ceilingFan = ceilingFan;
  }

  execute() {
    this.prevSpeed = this.ceilingFan.getSpeed();
    this.ceilingFan.off();
  }

  undo() {
    switch (this.prevSpeed) {
      case FanSpeed.HIGH:
        this.ceilingFan.high();
        break;
      case FanSpeed.MEDIUM:
        this.ceilingFan.medium();
        break;
      case FanSpeed.LOW:
        this.ceilingFan.low();
        break;
      case FanSpeed.OFF:
        this.ceilingFan.off();
        break;
      default:
        break;
    }
  }
}

/*
 * (Invoker)
 * We've got a remote control with only one button and corresponding slot 
 * to hold a device to control
 */
class SimpleRemoteControl {
  slot: Command;

  setCommand(command: Command) {
    this.slot = command;
  }

  buttonWasPressed() {
    this.slot.execute();
  }
}

/*
 * (Client)
 * Test SimpleRemoteControl
 */
// const simpleRemoteControl = new SimpleRemoteControl();
// const light = new Light('Kitchen');
// const lightOnCommand = new LightOnCommand(light);
// simpleRemoteControl.setCommand(lightOnCommand);
// simpleRemoteControl.buttonWasPressed();

/*
 * Remote control with different slots
 */
class NoCommand implements Command {
  execute() {
    console.warn('No command!');
  }

  undo() {
    console.warn('No command!');
  }
}

// Party mode
class MacroCommand implements Command {
  private readonly commands: Command[];

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  execute() {
    for (const c of this.commands) {
      c.execute();
    }
  }

  undo() {
    for (const c of this.commands) {
      c.undo();
    }
  }
}

class RemoteControl {
  private readonly N_COMMANDS = 7;

  private onCommands: Command[] = [];
  private offCommands: Command[] = [];
  // pressing undo before any other button won't do anything at all
  private undoCommand: Command = new NoCommand();

  constructor() {
    for (let i = 0; i < this.N_COMMANDS; i += 1) {
      this.onCommands.push(new NoCommand());
      this.offCommands.push(new NoCommand());
    }
  }

  setCommand(slot: number, onCommand: Command, offCommand: Command) {
    if (slot > this.N_COMMANDS - 1) {
      throw new Error(`slot should be less than ${this.N_COMMANDS}`);
    }

    this.onCommands[slot] = onCommand;
    this.offCommands[slot] = offCommand;
  }

  onButtonWasPressed(slot: number) {
    this.onCommands[slot].execute();
    this.undoCommand = this.onCommands[slot];
  }

  offButtonWasPressed(slot: number) {
    this.offCommands[slot].execute();
    this.undoCommand = this.offCommands[slot];
  }

  undoButtonWasPressed() {
    this.undoCommand.undo();
  }
}
/*
 * (Client)
 * Test RemoteControl
 */
console.log('\n');
const remoteControl = new RemoteControl();

const livingRoomLight = new Light('Living Room');
const bedRoomStereo = new Stereo('Bedroom');
const kitchenCeilingFan = new CeilingFan('Kitchen');

const livingRoomLightOnCommand = new LightOnCommand(livingRoomLight);
const livingRoomLightOffCommand = new LightOffCommand(livingRoomLight);
const bedRoomStereoOnCommand = new StereoOnWithCDCommand(bedRoomStereo);
const bedRoomStereoOffCommand = new StereoOff(bedRoomStereo);
const kitchenCeilingFanHighCommand = new CeilingFanHighCommand(kitchenCeilingFan);
const kitchenCeilingFanOffCommand = new CeilingFanOffCommand(kitchenCeilingFan);
const partyOnCommand = new MacroCommand([ livingRoomLightOnCommand, bedRoomStereoOnCommand ]);
const partyOffCommand = new MacroCommand([ livingRoomLightOffCommand, bedRoomStereoOffCommand ]);

remoteControl.setCommand(0, livingRoomLightOnCommand, livingRoomLightOffCommand);
remoteControl.setCommand(1, bedRoomStereoOnCommand, bedRoomStereoOffCommand);
remoteControl.setCommand(2, kitchenCeilingFanHighCommand, kitchenCeilingFanOffCommand);
remoteControl.setCommand(3, partyOnCommand, partyOffCommand);

remoteControl.onButtonWasPressed(0);
remoteControl.undoButtonWasPressed();
remoteControl.onButtonWasPressed(1);
remoteControl.offButtonWasPressed(1);
remoteControl.onButtonWasPressed(2);
remoteControl.offButtonWasPressed(2);
remoteControl.undoButtonWasPressed();
console.log('--- Pushing Macro On---');
remoteControl.onButtonWasPressed(3);
console.log('--- Pushing Macro Off---');
remoteControl.offButtonWasPressed(3);

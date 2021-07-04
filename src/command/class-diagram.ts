/*
 * Receiver -> knows how to perform the work needed to carry out the request.
 * Any class can act as Receiver
 */
class Receiver {

}


/*
 * Command declares an interface for all commands
 */
interface Command {
  execute(): void;
  undo(): void;
}

/*
 *  Client -> is responsible for creating a ConcreteCommand and setting its Receiver
 */
class Client {

}

/*
 * Invoker -> holds a command and at some point asks the command to carry out
 * a request by calling its execute() method
 */
class Invoker {
  arbitraryCommand: Command;

  setCommand(c: Command) {
    this.arbitraryCommand = c;
  }
}


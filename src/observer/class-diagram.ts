interface Subject {
  registerObserver: Function;
  removeObserver: Function;
  notifyObserver: Function;
}

interface Observer {
  update: Function; // this is called when the subject's state changes
}

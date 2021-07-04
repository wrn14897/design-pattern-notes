/* Goal
 * 1. We know the WeatherData class has getter methods ofr three measurement values:
 *    temperature, humidity and barometric pressure
 * 2. We know the measurementsChanged method is called anytime new weather measurement data is available
 * 3. We'll need to implement thress displays elements that use the weather data:
 *    'a current display', 'a statistic display' and 'a forecast display'. These displays must be updated
 *    as often as the WeatherData has new measurements
 * 4. To upate the displays, we'll add code to the measurementsChanged method
 */

interface Observer {
  update: () => void;
}

interface Subject {
  registerObserver: (observer: Observer) => void;
  removeObserver: (observer: Observer) => void;
  notifyObservers: () => void;
}

interface Display {
  display: () => void;
}

class WeatherData implements Subject {
  private temperature: number = 0;

  private humidity: number = 0;

  private pressure: number = 0;

  private observers: Observer[] = [];

  // getters
  getTemperature() {
    return this.temperature;
  }

  getHumidity() {
    return this.humidity;
  }

  getPressure() {
    return this.pressure;
  }

  // setters
  setTemperature(v: number) {
    if (v !== this.temperature) {
      this.temperature = v;
      this.measurementsChanged();
    }
  }

  setHumidity(v: number) {
    if (v !== this.humidity) {
      this.humidity = v;
      this.measurementsChanged();
    }
  }

  setPressure(v: number) {
    if (v !== this.pressure) {
      this.pressure = v;
      this.measurementsChanged();
    }
  }

  measurementsChanged() {
    this.notifyObservers();
  }

  registerObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notifyObservers() {
    for (const observer of this.observers) {
      observer.update();
    }
  }
}


class CurrentConditionDisplay implements Display, Observer {
  private weatherData: WeatherData;

  private temperature: number = 0;

  private humidity: number = 0;

  private pressure: number = 0;

  constructor(w: WeatherData) {
    this.weatherData = w;
    this.weatherData.registerObserver(this);
  }

  update() {
    this.temperature = this.weatherData.getTemperature();
    this.humidity = this.weatherData.getHumidity();
    this.pressure = this.weatherData.getPressure();
  }

  display() {
    console.log(`
      Current conditions:
        Temperature: ${this.temperature}
        Humidity: ${this.humidity}
        Pressure: ${this.pressure}
    `);
  }
}

class ForecastDisplay implements Display, Observer {
  private weatherData: WeatherData;

  private pressure: number = 2.24;

  private currentPressure: number = 2.24;

  constructor(w: WeatherData) {
    this.weatherData = w;
    this.weatherData.registerObserver(this);
  }

  update() {
    this.pressure = this.currentPressure;
    this.currentPressure = this.weatherData.getPressure();
  }

  display() {
    console.log(`Pressure forcast: ${this.currentPressure - this.pressure} diff`);
  }
}

const weatherData = new WeatherData();
const ccd = new CurrentConditionDisplay(weatherData);
const fd = new ForecastDisplay(weatherData);
ccd.display();
fd.display();
weatherData.setTemperature(23);
weatherData.setHumidity(90);
weatherData.setPressure(10);
ccd.display();
fd.display();

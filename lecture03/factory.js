/*
 * Design Patterns: Factory
 *
 * Implement a simple Factory design pattern that creates objects of different types
 * (for example, Car and Bike). These objects should have methods `ride()` and `stop()`,
 * and the base class should be called `Transport`.
 */

// Base class Transport
class Transport {
  ride() {
    throw new Error('Method send() must be implemented.');
  }

  stop() {
    throw new Error('Method stop() must be implemented.');
  }
}

// Car class inheriting from Transport
class Car extends Transport {
  ride() {
    console.log('Car is riding...');
  }

  stop() {
    console.log('Car has stopped.');
  }
}

// Bike class inheriting from Transport
class Bike extends Transport {
  ride() {
    console.log('Bike is riding...');
  }

  stop() {
    console.log('Bike has stopped.');
  }
}

// Factory class to create Transport objects
class TransportFactory {
  static createTransport(type) {
    switch (type) {
      case 'car':
        return new Car();
      case 'bike':
        return new Bike();
      default:
        throw new Error('Invalid transport type');
    }
  }
}

// Usage
const car = TransportFactory.createTransport('car');
car.ride();
car.stop();

const bike = TransportFactory.createTransport('bike');
bike.ride();
bike.stop();

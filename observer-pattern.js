class WeatherStation {
    constructor() {
        this.temperature = 0;
        this.observers = [];
    }

    setTemperature(temp) {
        console.log(`WeatherStation: new temperature measurement: ${temp}`);
        this.temperature = temp;
        this.notifyObservers();
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers() {
        for (let observer of this.observers) {
            observer.update(this.temperature);
        }
    }
}

class TemperatureDisplay {
    update(temperature) {
        console.log(`TemperatureDisplay: I need to update my display to: ${temperature}°C.`);
    }
}

class Fan {
    update(temperature) {
        if (temperature < 50 && temperature > 25 ) {
            console.log("Fan: It's hot here, turning myself on...");
        } else if(temperature < 25){
            console.log("Fan: It's nice and cool, turning myself off...");
        } else {
            console.log("Fan: It's very hot 🔥 I am gonna call emergency...");
        }
    }
}

// Usage
const weatherStation = new WeatherStation();
const tempDisplay = new TemperatureDisplay();
const fan = new Fan();

weatherStation.addObserver(tempDisplay);
weatherStation.addObserver(fan);

weatherStation.setTemperature(20);
weatherStation.setTemperature(30);
weatherStation.setTemperature(51);

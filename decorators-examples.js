// Syntax and Parameters
// A method decorator will receive the following three parameters:

// target: The prototype of the class for instance members or the constructor function of the class for static members.
// propertyKey: The name of the method being decorated.
// descriptor: The property descriptor for the method. This descriptor will be as defined in Object.getOwnPropertyDescriptor. You can modify properties like enumerable, writable, and configurable, as well as value, which is the function itself.

function logExecutionTime(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value; // save a reference to the original method

    descriptor.value = function(...args) {
        const startTime = performance.now(); // start timer
        const result = originalMethod.apply(this, args); // call the original method
        const endTime = performance.now(); // end timer
        console.log(`Execution time for ${propertyKey}: ${endTime - startTime} milliseconds`);
        return result;
    };
}

class Calculator {
    @logExecutionTime
    add(a, b) {
        // simulate some processing time
        for (let i = 0; i < 1000000; i++) {}
        return a + b;
    }
}

const calc = new Calculator();
console.log(calc.add(5, 3));


function validate(target, propertyName, descriptor) {
    const method = descriptor.value;

    descriptor.value = function(...args) {
        // Check if any of the arguments is null or undefined
        if (args.some(arg => arg === null || arg === undefined)) {
            throw new Error("Argument cannot be null or undefined");
        }

        // Perform further validation as required
        // For example, check if the first argument is a string
        if (typeof args[0] !== 'string') {
            throw new TypeError("First argument must be a string");
        }

        // Call the original method
        return method.apply(this, args);
    };
}

class Greeter {
    @validate
    greet(name, age) {
        if (age < 18) {
            throw new Error("You must be 18 or older to be greeted!");
        }
        return `Hello ${name}, you are ${age} years old!`;
    }
}

const greeter = new Greeter();

try {
    console.log(greeter.greet('Alice', 25)); // Should work fine
    console.log(greeter.greet(null, 25));    // Should throw an error
    console.log(greeter.greet('Alice', 15)); // Should throw an error
} catch (error) {
    console.error(error.message);
}


function range(min, max) {
    return function (target, propertyName, descriptor) {
        const method = descriptor.value;
        descriptor.value = function(...args) {
            if (args[0] < min || args[0] > max) {
                throw new RangeError(`The number must be between ${min} and ${max}`);
            }
            return method.apply(this, args);
        };
    };
}

class NumberRange {
    @range(1, 10)
    checkNumber(num) {
        return `${num} is a valid number in the range!`;
    }
}



// Creating a Simple Parameter Decorator

// A parameter decorator is a function that is called at runtime and receives the following three arguments:

// target: The prototype of the class (for instance methods) or the constructor function (for static methods) of the class.
// key: The name of the method in which the parameter is used.
// index: The zero-based index of the parameter in the method's parameter list.

function logParameter(target, key, index) {
    const functionName = key || target.constructor.name;
    console.log(`The parameter in position ${index} at ${functionName} has been decorated`);
}

class Greeter {
    // Can only be applied to a parameter in typescript
    greet(@logParameter message) {
        console.log(message);
    }
}
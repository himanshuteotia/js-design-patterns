// Benefits of the Module Pattern
// Encapsulation: Private variables and functions are shielded from the global scope. Only the methods that are explicitly exposed are accessible from the outside.
// Namespace management: Helps in organizing code logically in namespaces, avoiding global scope pollution.
// Reusability: Modules can be reused across different parts of an application.


// In Typescript

// Module pattern can be further enhanced using TypeScript-specific features such as access modifiers (public, private, protected) and more advanced type-checking. TypeScript also supports ES6 class syntax, which makes it easy to define classes with private and public members.

var CalculatorModule = (function() {
    // Private variables and functions
    var data = 0; // private variable

    function privateFunction() {
        console.log("Accessing private function");
    }

    // Public methods
    return {
        increment: function (value) {
            data += value;
            return data;
        },
        decrement: function (value) {
            data -= value;
            return data;
        },
        value: function() {
            return data;
        }
    };
})();

// Usage
console.log(CalculatorModule.value());  // Outputs: 0
CalculatorModule.increment(5);
console.log(CalculatorModule.value());  // Outputs: 5
CalculatorModule.decrement(3);
console.log(CalculatorModule.value());  // Outputs: 2

// CalculatorModule.data is undefined due to encapsulation
// CalculatorModule.privateFunction is not a function

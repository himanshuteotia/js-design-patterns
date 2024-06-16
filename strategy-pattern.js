// The Strategy design pattern is a behavioral design pattern that enables an object to change its behavior when its internal state changes. 

// Strategy Interface
class SortingStrategy {
    sort(array) {
        throw new Error("This method should be overridden!");
    }
}

// Concrete Strategies
class BubbleSort extends SortingStrategy {
    sort(array) {
        // Implement bubble sort
        console.log('Sorting using Bubble Sort');
        return array.sort(); // Simplification
    }
}

class QuickSort extends SortingStrategy {
    sort(array) {
        // Implement quick sort
        console.log('Sorting using Quick Sort');
        return array.sort((a, b) => a - b); // Simplification
    }
}

class MergeSort extends SortingStrategy {
    sort(array) {
        // Implement merge sort
        console.log('Sorting using Merge Sort');
        return array.sort((a, b) => a - b); // Simplification for example
    }
}

// Context
class SortedList {
    constructor(strategy) {
        this.strategy = strategy;
        this.array = [];
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    add(item) {
        this.array.push(item);
    }

    sort() {
        return this.strategy.sort(this.array);
    }
}

// Usage
const sortedList = new SortedList(new QuickSort());
sortedList.add(5);
sortedList.add(3);
sortedList.add(1);
sortedList.add(4);

console.log(sortedList.sort());  // Output sorted using Quick Sort

// Switching strategy
sortedList.setStrategy(new BubbleSort());
console.log(sortedList.sort());  // Output sorted using Bubble Sort

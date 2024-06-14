class ApiService {
    async fetchData() {
        // Logic to fetch data from an API
        return fetch('https://api.example.com/data')
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
    }
}

class DataProcessor {
    constructor() {
        this.apiService = new ApiService();
    }

    async processData() {
        try {
            const data = await this.apiService.fetchData();
            // Logic to process data
            console.log('Data processed:', data);
        } catch (error) {
            console.error('Error processing data:', error);
        }
    }
}

// Create an instance of DataProcessor
const dataProcessor = new DataProcessor();

// Use the high-level module
dataProcessor.processData();

// --- Explanation
// Low-Level Module: ApiService contains the logic for fetching data from an API.
// High-Level Module: DataProcessor directly creates an instance of ApiService and uses it to fetch and process data.
// --- Problems with This Approach
// Tight Coupling: DataProcessor is tightly coupled to ApiService. If you want to change the data source (e.g., to a different API or a database), you need to modify DataProcessor.
// Reduced Flexibility: It's harder to replace ApiService with a different implementation without changing DataProcessor.
// Difficult Testing: Testing DataProcessor in isolation becomes difficult because you can't easily mock ApiService. You would have to use the actual implementation or use more complex techniques to mock the dependency.
// Violation of Single Responsibility Principle: DataProcessor now has an additional responsibility of managing the data service, which should ideally be an external dependency.



class DatabaseService {
    async fetchData() {
        // Simulating a database call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
                resolve(data);
            }, 1000);
        });
    }
}

// Now if I want to use the DatabaseService in DataProcessor, I need to modify the DataProcessor class to create an instance of DatabaseService instead of ApiService. This change would require modifying the DataProcessor class, which violates the Open/Closed Principle.


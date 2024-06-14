// 1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
// 2. Abstractions should not depend on details. Details should depend on abstractions.


class IDataService {
    fetchData() {
        throw new Error("Method 'fetchData()' must be implemented.");
    }
}

class ApiService extends IDataService {
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


class DataProcessor {
    /**
     * @param {IDataService} dataService
     */
    constructor(dataService) {
        this.dataService = dataService;
    }

    async processData() {
        try {
            const data = await this.dataService.fetchData();
            // Logic to process data
            console.log('Data processed:', data);
        } catch (error) {
            console.error('Error processing data:', error);
        }
    }
}


// Create an instance of ApiService
const apiService = new ApiService();

// Inject ApiService into DataProcessor
const dataProcessorApi = new DataProcessor(apiService);
// Create an instance of DataBaseService

const databaseService = new DatabaseService();

// Inject DatabaseService into DataProcessor
const dataProcessorDateBase = new DataProcessor(databaseService);

// Use the high-level module
dataProcessorApi.processData();
dataProcessorDateBase.processData();


// --- Explanation
// Abstraction (Interface): IDataService defines the contract that any data service must follow.
// Low-Level Module: ApiService implements the IDataService interface and handles the actual data fetching logic.
// High-Level Module: DataProcessor depends on IDataService and performs data processing using the data fetched by ApiService.
// Dependency Injection: In main.js, an instance of ApiService is created and injected into DataProcessor. This way, DataProcessor depends on the abstraction (IDataService), not the concrete implementation (ApiService).





# Services Microservice

`catalog-services` is a microservice responsible for managing the service entities within the Service Catalog application. It provides functionality to add, retrieve, update, and delete service information from the database.

## How to Run the App

To run the `catalog-services` microservices locally on your machine, follow the steps below:

1. . **Navigate to the project directory:** Move into the project directory using the following command:

```sh
cd service-catalog/packages/catalog-services
```

2. **Install dependencies:** Install the required dependencies by running the following command:

```sh
yarn install
```

3. **Running the service:** To start the service locally using serverless offline, use:

```sh
yarn dev
```

4. For deploying to your AWS environment:

```sh
yarn run deploy
```

## API Reference

Available endpoints:

GET /services - Retrieves a list of services
PUT /services - Adds a new service
POST /services/{id} - Updates a service with the given ID
DELETE /services/{id} - Deletes the service with the given ID
GET /pinned-services - Retrieves a list of pinned services
PUT /services/pin - Updates the isPinned flag for an array of services

## Feedback and Contributions

We welcome any feedback or contributions to enhance the Service Catalog app. If you have any suggestions, issues, or ideas, please feel free to open an issue or submit a pull request on the GitHub repository.

Thank you for your interest in the Service Catalog app! We hope you find it useful and enjoy using it.

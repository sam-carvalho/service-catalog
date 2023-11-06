# Service Catalog App

Welcome to the frontend application for the Service Catalog, an intuitive platform for managing and categorizing services. This front-end app interacts with a serverless backend using AWS Lambda and DynamoDB for robust and scalable performance.

## How to Run the App

To run the Service Catalog app locally on your machine, follow the steps below:

1. **Navigate to the project directory:** Move into the project directory using the following command:

```sh
cd service-catalog/packages/catalog-web
```

2. **Install dependencies:** Install the required dependencies by running the following command:

```sh
yarn install
```

3. **Start the development server:** Once the dependencies are installed, start the development server with the following command:

```sh
yarn dev
```

This will compile the project and start the app on a local development server. You should see a message indicating the server is running and listening on a specific port (e.g., http://localhost:3000).

4. **Access the app:** Open your web browser and navigate to the provided URL (e.g., http://localhost:3000). The Service Catalog app should now be accessible, and you can start exploring and using its features.

## Technologies and Patterns Used

The app is built using the following technologies and patterns:

- React
- Next.js
- TypeScript
- Material-UI (MUI)
- App Shell Pattern
- React Provider Pattern

For testing, the app utilizes the Jest framework.

## Features

The current version of the Service Catalog app includes the following features:

1. Service Management: Users can add new services to the catalog and categorize them.
2. Category Management: Users can create and manage categories for organizing services.
3. Search: Users can search for specific services within the catalog.
4. User Interface: The app has a clean and intuitive user interface built using Material-UI, ensuring a smooth user experience.
5. Testing: The app includes a comprehensive test suite using Jest, ensuring reliable functionality.

## Feedback and Contributions

We welcome any feedback or contributions to enhance the Service Catalog app. If you have any suggestions, issues, or ideas, please feel free to open an issue or submit a pull request on the GitHub repository.

Thank you for your interest in the Service Catalog app! We hope you find it useful and enjoy using it.

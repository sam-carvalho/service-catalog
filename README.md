# Service Catalog App

This is a service catalog app that allows users to add and categorize services. It provides a user-friendly interface for managing services and organizing them into different categories. This README provides an overview of the app, its features, technologies used, how to run the app and future plans.

## How to Run the App

To run the Service Catalog app locally on your machine, follow the steps below:

1. **Clone the repository:** Start by cloning the GitHub repository to your local machine using the following command:

```sh
git clone https://github.com/sam-carvalho/service-catalog.git
```

2. **Navigate to the project directory:** Move into the project directory using the following command:

```sh
cd service-catalog
```

3. **Install dependencies:** Install the required dependencies by running the following command:

```sh
yarn install
```

4. **Start the development server:** Once the dependencies are installed, start the development server with the following command:

```sh
yarn dev
```

This will compile the project and start the app on a local development server. You should see a message indicating the server is running and listening on a specific port (e.g., http://localhost:3000).

5. **Access the app:** Open your web browser and navigate to the provided URL (e.g., http://localhost:3000). The Service Catalog app should now be accessible, and you can start exploring and using its features.


**Note:** Make sure you have Node.js and yarn installed on your machine before running the app.

## Technologies Used

The app is built using the following technologies:

React
Next.js
TypeScript
Material-UI (MUI)
For testing, the app utilizes the Jest framework.

## Features

The current version of the Service Catalog app includes the following features:

1. Service Management: Users can add new services to the catalog and categorize them.
2. Category Management: Users can create and manage categories for organizing services.
3. User Interface: The app has a clean and intuitive user interface built using Material-UI, ensuring a smooth user experience.
4. Testing: The app includes a comprehensive test suite using Jest, ensuring reliable functionality.

## Data Storage

The Service Catalog app employs a JSON-based data storage system to store service and category information. Rather than relying on a traditional database management system, the app utilizes JSON files for data persistence.

By utilizing JSON files, the app offers a lightweight and straightforward approach to storing and retrieving data. The data is stored in a structured format within the JSON files, making it easy to read, write, and manipulate the information.

The JSON files serve as a reliable means of data storage for the app, ensuring that service and category information remains persistent across different sessions and app restarts. They provide a flexible solution that can be easily modified and extended as per the evolving needs of the Service Catalog app.

Please note that as the app uses JSON files for data storage, it is essential to ensure proper file read and write permissions are granted to the app in the hosting environment. Additionally, it is recommended to regularly backup the JSON files to prevent data loss.

Using JSON files for data storage offers a practical and accessible solution for managing service and category information within the Service Catalog app.


## Future Plans

The Service Catalog app has exciting future plans and enhancements in the pipeline. Here are some features and improvements that will be added:

1. UI Revamp: The app's user interface will undergo a revamp to provide an enhanced and visually appealing experience. The new design style will draw inspiration from the popular Airbnb design style.
2. Search Functionality: A search bar feature is currently in progress and will be implemented soon. Users will be able to search for specific services within the catalog.
3. Sort Services by Category: A sorting option will be added to allow users to sort services based on their respective categories, making it easier to navigate and find desired services.

## Project Management

The project is managed using GitHub Projects. You can view the project board [here](https://github.com/users/sam-carvalho/projects/1/views/1). It provides an overview of the tasks, progress, and milestones associated with the development of the app.

## Design

The app's design is created using Figma, a collaborative design tool. You can access the design file [here](https://www.figma.com/file/fKx1F56HYhpEtl8txqFiI2/Service-Catalog?type=design&t=y4gF7Rm0q048Rt6U-0). It showcases the proposed UI revamp and the envisioned visual style for the app.

## Feedback and Contributions

We welcome any feedback or contributions to enhance the Service Catalog app. If you have any suggestions, issues, or ideas, please feel free to open an issue or submit a pull request on the GitHub repository.

Thank you for your interest in the Service Catalog app! We hope you find it useful and enjoy using it.
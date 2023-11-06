# Service Catalog Monorepo

Welcome to the Service Catalog monorepo. This project is composed of several microservices and a front-end application that together provide a comprehensive solution for service management and categorization.

## Overview

This project is designed to showcase a service catalog system, built using a microservices architecture pattern and a modern frontend application. The backend is powered by AWS serverless technologies like Lambda and DynamoDB, while the frontend is a React application using Next.js.

## Monorepo Management with Turbo Repo

[Turbo Repo](https://turbo.build/repo) to manage our monorepo, which includes tools for efficiently handling builds, testing, and dependencies across multiple packages within this repository. Turbo ensures consistent and fast builds by leveraging caching and task orchestration.

## Structure

The repository is structured as follows:

- `/catalog-services`: Contains the microservice for managing services.
- `/catalog-categories`: Contains the microservice for managing categories.
- `/catalog-web`: The frontend React application that provides the user interface for the service catalog.

Each directory has its own README.md providing detailed instructions on setup, configuration, and usage.

## Getting Started

To get started with this project, you should clone the repository and follow the setup instructions for each component:

```sh
git clone https://github.com/sam-carvalho/service-catalog.git
cd service-catalog
```

## Technologies

- Frontend: React.js, Next.js, Material-UI
- Backend: Node.js, AWS Lambda, DynamoDB
- Deployment: AWS CloudFormation, Serverless Framework

## AWS Configuration

Before deploying a microservice to AWS, you need to configure your AWS credentials. If you have the AWS CLI installed, you can configure it by running:

```sh
aws configure
```

You'll be prompted to enter your AWS Access Key ID, Secret Access Key, region, and output format. These credentials will be used by the Serverless framework to deploy your functions to AWS Lambda.

Your AWS account must have an IAM role with the following permissions for the microservice to function correctly:

DynamoDB:PutItem: To allow the service to add new records to the DynamoDB table.
DynamoDB:Scan, DynamoDB:Query: To allow the service to read data from the DynamoDB table.
DynamoDB:UpdateItem: To allow the service to update records in the DynamoDB table.
DynamoDB:DeleteItem: To allow the service to delete records from the DynamoDB table.

You can attach these permissions to the IAM role used by your Lambda functions.

## Data Storage

DynamoDB is used to store and retrieve data that supports our service catalog functionality.

### DynamoDB Tables

- ServicesTable: Stores information about various services that our catalog offers. Each item in the table represents a service with attributes such as id, name, url, logo, isPinned, and categoryId.

- CategoriesTable: Contains the different categories under which services can be classified. Each item has a unique id and a name attribute.

### Data Model

Here's a high-level overview of the data model for the DynamoDB tables used by our microservices:

#### ServicesTable

- id (String): Unique identifier for the service, generated using UUID.
- name (String): Name of the service.
- url (String): URL of the service.
- logo (String): Link to the service's logo image.
- isPinned (String): Indicates if the service is pinned for quick access.
- categoryId (String): Identifier of the category this service belongs to.

#### CategoriesTable

- id (String): Unique identifier for the category, generated using UUID.
- name (String): Name of the category.

### Indexes

To optimize the read operations, especially queries and scans, secondary indexes are used:

- Global Secondary Index (GSI) on the ServicesTable for querying pinned-services by using isPinned flag to efficiently list all pinned services.

## Future Plans

The Service Catalog app has exciting future plans and enhancements in the pipeline. Here are some features and improvements that will be added:

1. UI Revamp: The app's user interface will undergo a revamp to provide an enhanced and visually appealing experience. The new design style will draw inspiration from the popular Airbnb design style.
2. Delete and Edit: An option to delete and edit services and categories will be implemented soon to allow users to further customize their experience.
3. Sort Services by Category: A sorting option will be added to allow users to sort services based on their respective categories, making it easier to navigate and find desired services.
4. Dark Mode: Users will be able to switch between light and dark mode by using a toggle on the top of the page
5. Backend enhancements: GSI on the ServicesTable for querying services by categoryId to efficiently list all services in a given category.

## Project Management

The project is managed using GitHub Projects. You can view the project board [here](https://github.com/users/sam-carvalho/projects/1/views/1). It provides an overview of the tasks, progress, and milestones associated with the development of the app.

## Design

The app's design is created using Figma, a collaborative design tool. You can access the design file [here](https://www.figma.com/file/fKx1F56HYhpEtl8txqFiI2/Service-Catalog?type=design&t=y4gF7Rm0q048Rt6U-0). It showcases the proposed UI revamp and the envisioned visual style for the app.

## Feedback and Contributions

We welcome any feedback or contributions to enhance the Service Catalog app. If you have any suggestions, issues, or ideas, please feel free to open an issue or submit a pull request on the GitHub repository.

Thank you for your interest in the Service Catalog app! We hope you find it useful and enjoy using it.

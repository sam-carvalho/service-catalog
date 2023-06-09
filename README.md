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

## Data Storage

The Service Catalog app supports two options for data storage: JSON files and AWS S3.

### JSON Files

Locally, the app utilizes JSON files for data storage out of the box. When running the app locally, the JSON files are automatically created and used to store service and category information.

Please ensure that the app has proper file read and write permissions in the hosting environment to enable data storage and retrieval. Additionally, it is recommended to regularly backup the JSON files to prevent data loss.

### AWS S3

For production or when hosting the app, you have the option to use AWS S3 for data storage. AWS S3 provides scalable, secure, and highly available object storage.

To configure the app to use AWS S3, follow these steps:

1. Set the following environment variables:
   - `AWS_ACCESS_KEY_ID`: The AWS access key ID associated with your AWS account.
   - `AWS_SECRET_ACCESS_KEY`: The AWS secret access key associated with your AWS account.
   - `BUCKET_NAME`: The name of the AWS S3 bucket to use for storing the app's data.
   - `STORAGE`: Set this variable to `aws` to enable AWS S3 storage.

2. Grant the necessary permissions to the app in your AWS account. Ensure that the IAM user associated with the access key ID and secret access key has the appropriate permissions to access and modify objects in the specified S3 bucket.

With the environment variables set and the necessary permissions configured, the app will use AWS S3 as the data storage solution. Data will be stored in the specified S3 bucket, allowing for seamless scalability and reliable data persistence.

For detailed instructions on setting up an S3 bucket and configuring IAM permissions, you can refer to the following article: [Setting Up an S3 Bucket for Service Catalog App](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html)

Please note that when using AWS S3, the app requires a stable internet connection and the proper AWS credentials to access the S3 bucket.

Using JSON files for data storage is suitable for local development and small-scale deployments, while AWS S3 offers a robust and scalable solution for production environments with increased data volumes and reliability requirements.

Choose the data storage option that best fits your needs based on the deployment environment and anticipated usage patterns of the Service Catalog app.

If you have any questions or need further assistance with data storage configuration, please don't hesitate to reach out.

## Future Plans

The Service Catalog app has exciting future plans and enhancements in the pipeline. Here are some features and improvements that will be added:

1. UI Revamp: The app's user interface will undergo a revamp to provide an enhanced and visually appealing experience. The new design style will draw inspiration from the popular Airbnb design style.
2. Delete and Edit: An option to delete and edit services and categories will be implemented soon to allow users to further customize their experience.
3. Sort Services by Category: A sorting option will be added to allow users to sort services based on their respective categories, making it easier to navigate and find desired services.
4. Dark Mode: Users will be able to switch between light and dark mode by using a toggle on the top of the page

## Project Management

The project is managed using GitHub Projects. You can view the project board [here](https://github.com/users/sam-carvalho/projects/1/views/1). It provides an overview of the tasks, progress, and milestones associated with the development of the app.

## Design

The app's design is created using Figma, a collaborative design tool. You can access the design file [here](https://www.figma.com/file/fKx1F56HYhpEtl8txqFiI2/Service-Catalog?type=design&t=y4gF7Rm0q048Rt6U-0). It showcases the proposed UI revamp and the envisioned visual style for the app.

## Feedback and Contributions

We welcome any feedback or contributions to enhance the Service Catalog app. If you have any suggestions, issues, or ideas, please feel free to open an issue or submit a pull request on the GitHub repository.

Thank you for your interest in the Service Catalog app! We hope you find it useful and enjoy using it.
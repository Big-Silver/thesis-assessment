# README.md

## Nest.js App with PostgreSQL Database

This repository contains a Nest.js application with a PostgreSQL database.

### Getting Started

To run this project locally, follow these steps:

1. **Clone the repo**:

   - Clone the repository to a location of your choice on your computer.

2. **Navigate into the project directory**:

   ```bash
   cd server
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set up Database Configuration**:

   - Rename or copy the `.env.example` file to `.env`.
   - Open the `.env` file and configure the following variables for your PostgreSQL database:
     ```bash
     DB_HOST=your_database_host
     DB_PORT=your_database_port
     DB_USERNAME=your_database_username
     DB_PASSWORD=your_database_password
     DB_NAME=your_database_name
     PORT=your_port
     ```

5. **Run Database Migrations**:

   - To generate a new migration, run:

     ```bash
     npm run migration:generate -- <migration_name>
     ```

     Replace `<migration_name>` with an appropriate name for your migration, for example:

     ```bash
     npm run migration:generate -- db/migrations/AddNewPaswordColumn
     ```

   - To apply pending migrations, run:

     ```bash
     npm run migration:run
     ```

     6. **Start the Application**:

   ```bash
   npm run start:dev
   ```

This command will start the Nest.js application in development mode. The server will be running at PORT by default.

### More Information

For more information on how to work with Nest.js, refer to the [Nest.js documentation](https://docs.nestjs.com/).

This is an application for a database system built using Node.js and Express.js framework.

The database is MySQL or MariaDB and can be managed using an API platform software such as Postman.

To start the application, create the database using the SQL script provided and then run "npm install" or "npm i" in the backend folder. This will install all the necessary dependency packages. You then need to configure the .env file inside the backend folder, and run "npm run dev" to start the server.

The API has functions for create, read, update, delete and import data into the 5 tables in the database. Each table has its own API path for these functions, and data is sent using HTTP requests. The create function uses a POST request, the read function uses a GET request, the update function uses a PUT request, and the delete function uses a DELETE request. The importData function is used to import data from a CSV file and is called using a POST request.

See /doc/doc.pdf for more information.
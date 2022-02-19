# store-frontend-udacity-project-2-nodejs-project
### this project due to Phase one of FWD-Egypt at Udacity

### Getting Started 
This project is simple e-commerce with Node.JS, Express Server and Postgresql.

### Technologies
- Backend (Nodejs and Express)
- DB (Postsgress)
- JWT for Auth tokens
- Jasmine for testing


### Structures

- Migration Folder contain Migrations files.
- src/config contain application configuration like DB connections
- src/Routes handle the routes of the applications
- src/controllers handle the controllers files of routes
- src/helpers contains all required helper functions like seeders
- src/middleware contains middleware through the applications
- src/model contains model files that represent the DB
- src/repositories contains all queries
- src/requests contains the validations of each requests
- src/seeders contains the required seeders for the applications
- src/services contains all required logics

### Commands

Install Application

`npm install`

To Migrate application

`npm run migrate`

To Seed application

`npm run db:seed`


Admin Email and Password

email :: sameh@gmail.com

password :: 123456


To Rollback Migrate application

`npm run migrate-rollback`


To test application

`npm run test`


To build application

`npm run build`

To start application

`npm run start`




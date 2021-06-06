# Ecommerce Cart mini project

## To run this project

Use:

- Node version: 12.20.1
- Npm version: 6.14.6
- Yarn version: 1.22.10
- Docker

### Running the backend

Running the database, access the backend folder and run `./postgres/run.sh local`, this command will create an instance of postgres database.
Access this database using some IDE you like, use the user `saito` and password `ecommerce`, the database is running in port `64432`

Install the dependences using `yarn install`

Apply the migrations using `yarn migrate up`

Populate some data in this new database running the scripts in folder `/backend/sql-scripts/`

And run the code using `yarn start:fast`

### Running the frontend

Install the dependences using `yarn install`

And run the code using `yarn start`

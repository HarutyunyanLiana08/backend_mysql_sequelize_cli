# Backend e-commerce

## Description

This e-commerce backend aplication project is ready for most basic core tasks like authorization, authentication, email verification and CRUD.

## Features

* User registration and login
* Authentication via JWT
* Email confirmation
* CRUD for products
* MySql database

### Installing

```
git clone https://github.com/HarutyunyanLiana08/backend_mysql_sequelize_cli.git
cd ..  backend_mysql_sequelize_cli
npm install
```

## Getting Started

To test the application

* Create MySql database and choose a username and password for it
* Create config.json file and add the database data as in the example
```
    {
    "development": {
        "username": "username",
        "password": "password",
        "database": "database name",
        "host": "host",
        "port": "port",
        "dialect": "mysql"
    },
    "test": {
        "username": "username",
        "password": "password",
        "database": "database name",
        "host": "host",
        "port": "port",
        "dialect": "mysql"
    },
    "production": {
        "username": "username",
        "password": "password",
        "database": "database name",
        "host": "host",
        "port": "port",
        "dialect": "mysql"
    }
    }
```

* Create .env file and add 
    * PORT = port(the port on which you want to send a request)
    * T_SECRET = secret(the password with which the token will be issued)
    * EMAIL = email(the email from which you want to send a code for verification)
    * EMAIL_PASSWORD = password (Enable 2 factor authentication and click on app passwords (gmail example: https://support.google.com/mail/answer/185833?hl=en))

```
Create the database tables
    npx sequelize-cli db:migrate

Start the application
    npm start
```

## Authors

Contributors names and contact info

ex. Liana Harutyunyan
ex. https://github.com/HarutyunyanLiana08

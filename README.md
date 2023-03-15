# music-app
This project represents the backend side of a music app in which albums, artists and tracks are associated properly.
I had the opportunity to design and implement a Postgress DB, design and document(OpenAPI 3) a RESTful API as well as to utilize JavaScript in order to build an Express server.


---

## Requirements

You will only need Node.js and a node global package, npm, installed in your environement.
## Set up

Start with cloning this repo on your local machine and install all required node packages:

Clone repository using your ssh credentials:
```sh
 $ git clone git@github.com:gtopsis/music-app.git
```

Install all npm packages:
```sh
 $ cd music-app
 $ npm install
```
## Configure databases

Before running the app, you have to create the following two **postgreSQL** databases. You will need:

- musicapp_development
- musicapp_test

## Running the project

### Starting the app

```sh
 $ npm run start
```

API will be available at [localhost:3000](localhost:3000) (i.e http://localhost:3000/v1/artists).

### Running the tests

```sh
 $ npm run test:api-unit
```

### Retrieve json file of API v1 specification

Navigate to [http://localhost:3000/static/openapi.json](http://localhost:3000/static/openapi.json) in your browser.

### Play with the API using tool **Insomnia**.

In case you want to play with the API, I have uploaded a collection of endpoints in order to import it to Insomnia.

[http://localhost:3000/static/Insomnia_2021-08-16.json](http://localhost:3000/static/Insomnia_2021-08-16.json)

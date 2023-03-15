# music-app
This project represents the backend side of a music app in which albums, artists and tracks are associated properly.
I had the opportunity to design and implement a Postgress DB, design and document(OpenAPI 3) a RESTful API as well as to utilize JavaScript in order to build an Express server.

<p float="left">
  <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*1LTco1HO2xJUyA3aUmX7DQ.jpeg" alt="Tech stack of the project" width="45%" />
  <img src="/screenshots/API.png" width="45%" /> 
</p>


---

## Requirements

You will only need Node.js and a node global package, npm, installed in your environement.
## Set up

Start with cloning this repo on your local machine and install all required node packages:


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
 $ npm i
 $ npm run start
```

### Running the tests

```sh
 $ npm run test:api-unit
```

### Retrieve json file of API v1 specification

Navigate to [http://localhost:3000/static/openapi.json](http://localhost:3000/static/openapi.json) in your browser.

### Play with the API using tool **Insomnia**.

In case you want to play with the API, I have uploaded a collection of endpoints in order to import it to Insomnia.

[http://localhost:3000/static/Insomnia_2021-08-16.json](http://localhost:3000/static/Insomnia_2021-08-16.json)

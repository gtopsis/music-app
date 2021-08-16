# fair-music-app
A fair music app for artists to manage their recordings and tracks

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.
## Install

Start with cloning this repo on your local machine and install all required node packages:

```sh
    $ git clone https://github.com/gtopsis/fair-music-app.git
    $ cd fair-music-app
    $ npm install
```
## Configure databases

Before running the app, you have to create the following two databases. You will need:

- musicapp_development
- musicapp_test

## Running the project

### Serving the app

```sh
    $ npm run serve
```

Open your browser at `localhost:3000`.

### Running the tests

```sh
    $ npm run test:api-unit
```
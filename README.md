# Play Code

PlayCode is a video post control API whose main focus is on information technology

# Documentation & API

The documentation is part of the api, so use the endpoints shown in the documentation in the same url.
You can find the API documentation [here](https://playcodeapi.herokuapp.com/).

# Getting Started

### To install locally on your machine clone the repository:

```bash
git clone git@gitlab.com:estevan2/playcode-api.git
```

### Access the created clone folder:

```bash
cd playcode-api
```

### Install project dependencies:

```bash
yarn
```

### Start the database with [docker](https://www.docker.com/):

```bash
sudo docker-compose up -d
```

### Apply migrations to the database:

```bash
yarn typeorm migration:run
```

### Start the application:

```bash
yarn dev
```

### If this is the terminal's response, your application is running fine on localhost:3000.

```bash
yarn run v1.22.17
$ tsnd --transpile-only --respawn --ignore-watch node_modules src/server.ts
[INFO] 19:38:57 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.5.5)
[app] Connect at Database
[app] server running at http://localhost:3000
```

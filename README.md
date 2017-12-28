# Movies Tracker

![Alt Text](https://github.com/barrancocarlos/movies-tracker/blob/master/public/images/node.jpg)

An app that allows you to keep track of the movies you want to see.

Movies Tracker keeps your movie list organize y genre and priority level.

![Alt Text](https://github.com/barrancocarlos/movies-tracker/blob/master/public/images/home.jpg)

### Some Features

Movies tracker uses the following:

* It uses de ObjectID function (MongoDB with Mongoose):  to query and populate the Movies Genre data from a different collection.
* It uses Multer to upload the movies images.
* It has a Rest Api with Express.js for CRUD operations.
* It uses Passport.js for authentication.
* It uses handlebars helpers for conditional logic.

![Alt Text](https://github.com/barrancocarlos/movies-tracker/blob/master/public/images/capture.jpg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

* Git - [Download & Install. Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this GitHub Gist to install Node.js.
* MongoDB - [Download & Install MongoDB](https://docs.mongodb.com/manual/installation/), and make sure it's running on the default port (27017). Create a Database named like the one in the project and [import the data](https://docs.mongodb.com/v2.6/core/import-export/) from the database_export folder using [mongorestore](https://docs.mongodb.com/v2.6/reference/program/mongorestore/#bin.mongorestore).

### Installing

```bash
# Clone this repository
$ git clone https://github.com/barrancocarlos/multer-express.js.git

# Go into the repository
$ cd movies-tracker

# Install dependencies
$ npm install

# Run the app
$ node server.js

# App will run on http://localhost:3000
```

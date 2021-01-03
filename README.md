It's a project I would like to show you the typescript code and my way to organize the project using DDD + SOLID + Package-by-feature + Clean Code + REST (Best practices)

**This project is not fisished yet, but I think there are lot of implementations and concepts which can be seen for anyone. Feel free to see the way that I code =)**

# HOW TO RUN?

`You can run this project in many different ways.`

1. If you wish or have more familiarity using Docker, you should execute:
```
docker-compose build
docker-compose up
```

2. If you prefer to execute in dev mode, you can run the followe commands:
```
npm install
npm run start-ts
```

# 1. Structure

The project is splitted in a few folder, for example:

- 1. `src` - Is the main folder where the typescript code was written.
  - 1.1. `components` - It's a component folder where we can develop our abstractions to implement some pattern or system behaviour, for example: logger, tracing, metrics. This folder is a strong candidate to be a npm module.
  - 1.2. `entities` - Is the place where the domains are located.
  - 1.3. `enums` - All the enums are located here.
  - 1.4. `exceptions` - This is the folder where we can build and put our custom errors.
  - 1.5. `middlewares` - All express middlewares can be put here.
  - 1.6. `openapi` - All openapi specifications.
  - 1.7. `repositories` - Every kind of persistence layer can be added here, for example, a file repository, a database repository or whatever you want to persist/retrieve/manipualte.
  - 1.8. `routes` - All express routes can be found here.
  - 1.9. `use-cases` - It's a folder structured based on the pattern "Package-by-feature" reflecting a feature in the application written by use cases, but it could be a user story, or adapted to a feature of the system. In this folder I'll write the controller, the use case bussiness service, the data tranfer object to convert data and the test specification. By this way we can notice and develop high cohesion code and split our system modules in a good format respecting SOLID principles.
  - 1.10. `utils` - Folder with which includes many kinds of utility functions.

# 2. REST

This service was develop to provide some resources to manipulate an entity called users. This is just an example to show you some best practices when you are develooing some resources in REST protocol.

`GET` - This http method is used to retrieve some data. So if you are searching for something, you can use this resource to get some information.
`POST` - This http method is frequently used to create some entity, but also can be used to upload some content for example, but usually you use POST when you are inserting some new content.
`PUT` - When you wish to update some data you should use this resource to change the state or change some content about your entity.
`PATCH` - Patch means that you can change your state or update some fields about your entity. This is not a rule but as best practices you should use this http method to do something like that.

**Note1**: `This project has a folder called in ´src/openapi´ where there is a set of files splitted by versions which is about openapi specification. Openapi is a kind of specification to write interfaces for modern APIs. So you can describe all resources by writing a file followed by openapi specification rules.`

**Note 2**: `There is a middleware being used called 'express-openapi-validator'. You can figure out all the features in npm repository about this library, but it allow us describe a an openapi file and the middleware validates the request and response against what is specified. So I use this to garantee all the requests data.`

## 2.1. - Create users

So first to create an user you should use the resource `/users (POST)`. Users can be created here.

## 2.2. - Filter users

If you want to retrieve all the users or use some filter to retrieve specific kind of users you should use the resource `/users (GET)`. It allow us filter the result passing some query parameters which were offered.

## 2.3. - Retrieve an user

To retrieve a specific user you should use the resource `/users/{id} (GET)`. `id` is always provided on user's creation. So to retrieve a specific user we are using the unique identifier about our entity.

## 2.4. - Update an user

Sometimes we would like to change our data, our entity data. To do this with users you should use the resource `/users/{id} (PUT)`. Again you see here the unique identifier of users. It's because we want to change the data of a specific user.

## 2.5. - Update some user field

Here, on this project this resource is just to manipulate the `birthdate` field of our entity called user. You should do this calling the resource `/users/{id} (PATCH)`. This is just a simple example to show you the propose of the http verb, but it could be used to manipulate some state or more data. But is more consistent update all data using the http verb `PUT`. `PATCH` is more used to manipulate just a piece of all of our entity.

# 3. Some features used

Some features were used to demonstrate the ability to improve your service using some concepts like tracing your request between you functions and logging.

- `Logging`: When you are writing services or microservice it's a good approach provide logs, because it helps a lot in dev mode and whe your application is on production, to identify more quickly some possible problems.
- `Tracing`: When you are writing your resources imagine that there are many asynchronou operations, and it would be better if we have a way to trace our requests, our task's flow by correlationing the stack trace by some identifier. That's the reason that we have to provide a mechanism to trace our flow using a kind of `correlationId`.
- `Errors`: It's very good to make your exceptions or error classes to describe better when a problem occurs. But joinned with this concept, when you are designing your resources, think in a way to map and write your business errors, standardizing your return and trying to describe your errors and detailed errors if it would the case.

All this concepts above are primordial things that I think it's very important when you are coding some service or microservice which provide REST resources. `Concepts mentioned above were implemented here on this project` :)
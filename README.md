It's a project I would like to show you the typescript code and my way to organize the project using DDD + SOLID + Package-by-feature + Clean Code + REST (Best practices)

**This project is not fisished yet**

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
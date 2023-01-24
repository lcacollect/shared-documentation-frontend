# LCA Collect - Shared Documentation Library

A shared library for documentation related components and pages
This library contains building blocks for dealing with reporting schemas, categories and elements, sources and tasks in
a React.js app.

![LCA Collect Dependencies](./dependencies.png)

## Getting Started

1. Generate a Personal Access Token (PAT) with _Packaging (Read & write)_ scope
   on [Azure Devops](https://dev.azure.com/arkitema/_usersSettings/tokens)
2. Connect to [the Azure Artifacts _
   frontend-packages_ feed](https://dev.azure.com/arkitema/lca-platform/_artifacts/feed/frontend-packages/connect/npm) -
   click on 🖥**Other** and follow the instructions

## Build, Test & Publish

Testing is done with [Vitest](https://vitest.dev/)

```shell
npm run test
```

To publish a new version:

1. Update the version in `package.json` (remember to follow semver)
2. When you're satisfied and ready to publish, then create a PR

## Development Setup with other @lcacollect packages

You can use `npm link` to set up live reloading of the other `@lcacollect` packages.

- Clone the package that you wish to enable live reload on.
- In the terminal, go the root folder of the cloned repo and write `npm link` in the terminal
- Go back to this repo's root folder and write `npm link @lcacollect/{PACKAGE}` to link the package.
- When you make changes to the package, that you wish to see in this app, simply run `npm run build` in the package and
  the changes will available here.

## Folder Structure and Naming
```python
src/ # Contains the source code
    __mocks__/ # Contains the mock data and functions for unit tests
    assets/ # Contains assets, such as images
    components/ # React components
        myComponent/ # Each component has its own folder
            index.ts # Export of what is public
            myComponent.tsx # The component
            myComponent.spec.tsx # Unit test file
    dataAccess/ # Apollo Client folder
        generated.ts # Autogenerated file from Apollo with React Hooks for data fetching
        schema.graphql # File for writing GraphQL queries
    pages/ # Page components
```

## Further Documentation

Further documentation for LCAcollect can be found [here](https://github.com/lcacollect/.github/blob/main/wiki/README.md)

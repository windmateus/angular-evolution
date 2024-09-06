# AngularEvolution

The application is a simple CRUD of games. The frontend is developed in Angular and the backend is a simple json-server.

Choose the branch with the Angular version you want and just follow the instructions below.
- Install node 8.17.0 or [other compatible](https://angular.dev/reference/versions) for this Angular 6 app version
- If you have some node_modules folder from another version, delete it 
- Then run this to install the dependencies:
```sh
npm install
```
In package.json, we have a "server" script to run the json-server backend whose "database" is the file **db.json**. We use **concurrently** to run the frontend at the same time. So, to run the application you just do:
```sh
npm run dev


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

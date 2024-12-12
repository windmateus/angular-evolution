# AngularEvolution

This app is a simple CRUD of games. The frontend in Angular and the backend is a json-server.
The main goal is to show the evolution of Angular over the years, with each branch corresponding to a version.

Choose the branch with the Angular version you want and just follow the instructions below.
- Install node 20 or [other compatible](https://angular.dev/reference/versions) for this Angular 17 app version. For manage nodejs versions, we strongly recommend [n node manager](https://www.npmjs.com/package/n)
- If you have some node_modules folder from another version, delete it 
- Then run this to install the dependencies:
```sh
npm install
```
In package.json, we have a "server" script to run the json-server backend whose "database" is the file **db.json**. We use **concurrently** to run the frontend at the same time. So, to run the app you just do:
```sh
npm run dev
```
...and navigate to `http://localhost:4200/`. 

Just that.

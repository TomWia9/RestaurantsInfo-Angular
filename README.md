# RestaurantsInfo

RestaurantsInfo is an **Angular 12 + NET 5** application.

## Description
The app provides a couple of possibilities to search restaurants and dishes.

**RestaurantsInfo** provides panels for both, **User** and **Administrator**
#### User features:
* Login and register
* Searching for restaurants
* Searching for dishes

#### Administrator features:
* Adding new restaurants and dishes
* Editing restaurants and dishes
* Deleting restaurants and dishes
#### Logging into the app
Every user has a unique *email* address that can be used to log in to the system. By default there is only *email* and *password* of admin (*Email*: **admin@admin**, *Password*: **Admin123_**).

## Screenshots
<details>
  <summary>Click to expand!</summary>
  
#### Landing page
![RestaurantsSearching](https://i.imgur.com/H6uHTfl.png[/img] "Landing page")

#### Informations about the restaurant and its dishes
![RestaurantInformations](https://i.imgur.com/xRMupfF.png[/img] "Informations about the restaurant and its dishes")

#### Editing restaurant (Admin feature)
![EditingRestaurant](https://i.imgur.com/1OBDJyn.png[/img] "Editing restaurant (Admin feature)")

</details>

## Installation
You need to have **Node.js** and **npm** installed on your PC/Mac.

Then just run `npm install` in the project's root.

#### IMPORTANT!
>**You also need to have installed and runned [API](https://github.com/TomWia9/RestaurantAPI) which supports system funcionality.
You should download it from my [repository](https://github.com/TomWia9/RestaurantAPI)**

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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

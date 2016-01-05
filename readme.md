# demo-backbone-app

A demo backbone app to teach myself some backbonejs goodness.

## Run it

1. Clone this repository
2. `cd` into the folder
3. Run `npm install` the first time you run this app
4. Run `npm start`
5. Goto [localhost:3000](http://localhost:3000/)

## API Endpoints

> Note: These endpoints, when hit using AJAX return JSON
> else they usually return a full page

### `GET /employees/:id`

Returns details of employee with `id`

### `POST/PUT /employees/:id`

Updates details of employee with `id`

Takes two params, `name` & `company` both of which are strings.

### `DELETE /employees/:id`

Deletes employee with `id`

### `GET /employees`

Returns an array containing all employees

### `POST /employees`

Creates a new employee and returns it

Mandatory params are `name` & `company` both of which are strings.

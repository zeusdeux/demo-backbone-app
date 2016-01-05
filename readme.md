# demo-backbone-app

A demo backbone app to teach myself some backbonejs goodness.


# API Endpoints

> Note: These endpoints, when hit using AJAX return JSON
> else they usually return a full page

### `GET /employee/:id`

Returns details of employee with `id`

### `POST/PUT /employee/:id`

Updates details of employee with `id`

Takes two params, `name` & `company` both of which are strings.

### `DELETE /employee/:id`

Deletes employee with `id`

### `GET /employees`

Returns an array containing all employees

### `POST /employees`

Creates a new employee and returns it

Mandatory params are `name` & `company` both of which are strings.

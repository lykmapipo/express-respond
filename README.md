express-respond
=====================

[![Build Status](https://travis-ci.org/lykmapipo/express-respond.svg?branch=master)](https://travis-ci.org/lykmapipo/express-respond)

HTTP response methods with auto content negotiation for [expressjs](https://github.com/strongloop/express/)

## Installation
```sh
$ npm install --save express-respond
```

## Usage
```js
const express = require('express');
const respond = require('express-respond');

const app = express();
app.use(respond);

app.get('/', (request, response) => {
  response.ok({ name: 'lykmapipo' });
});

app.use((error, request, response) => {
  response.error(error);
});
```

## API
All response methods accept optional response `body` based on response type, as some of response are not must to have response body.

### 2xx methods

#### `ok(body: Any)`
Send JSON response with `200 http status code`.

Example
```js
response.ok(body);
```

#### `created(body: Any)`
Send JSON response with `201 http status code`.

Example
```js
response.created(body);
```

#### `accepted([body: Any])`
Send JSON response with `202 http status code`.

Example
```js
response.accepted(body);
```

### `noContent()`
Send JSON response with `204 http status code`.

Example
```js
response.noContent();
```

### 3xx methods

#### `notModified([body: Any])`
Send JSON response with `304 http status code`.

Example
```js
response.notModified(body);
```

### 4xx methods

#### `badRequest([body: Any])`
Send JSON response with `400 http status code`.

Example
```js
response.badRequest(body);
```

#### `unauthorized([body: Any])`
Send JSON response with `401 http status code`.

Example
```js
response.unauthorized(body);
```

#### `paymentRequired([body])`
Send JSON response with `402 http status code`.

Example
```js
response.paymentRequired(body);
```

#### `forbidden([body: Any])`
Send JSON response with `403 http status code`.

Example
```js
response.forbidden(body);
```

#### `notFound([body: Any])`
Send JSON response with `404 http status code`.

Example
```js
response.notFound(body);
```

#### `methodNotAllowed([body: Any])`
Send JSON response with `405 http status code`.

Example
```js
response.methodNotAllowed(body);
```

#### `conflict([body: Any])`
Send JSON response with `409 http status code`.

Example
```js
response.conflict(body);
```

### 5xx methods

#### `internalServerError([body: Any])`
Send JSON response with `500 http status code`.

Example
```js
response.internalServerError(body);
```

#### `notImplemented([body: Any])`
Send JSON response with `501 http status code`.

Example
```js
response.notImplemented(body);
```

#### `badGateway([body: Any])`
Send JSON response with `502 http status code`.

Example
```js
response.badGateway(body);
```

#### `serviceUnavailable([body: Any])`
Send JSON response with `503 http status code`.

Example
```js
response.serviceUnavailable(body);
```

### Error methods

#### `error([body: Error])`
Send `error` as JSON response with `http status code` obtained from `error.status` property.

Example
```js
response.error(error);
```


## Testing

* Clone this repository

* Install all development dependencies

```sh
$ npm install
```
* Then run test

```sh
$ npm test
```

## Contribute

Fork this repo and push in your ideas. 
Do not forget to add a bit of test(s) of what value you adding.

## Licence

The MIT License (MIT)

Copyright (c) 2015 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 

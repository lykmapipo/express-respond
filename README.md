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
var respond = require('express-respond')
 
//use with default options
app.use(respond());

//or use with custom options
app.use(respond({
            defaultType: 'html',
            environment: 'production',
            types: ['json', 'html']
        }));

//json or jsonp response
response.ok(data);

//view response
response.ok('users',data);

//text response
response.ok('foo bar');
```

## Options
`express-respond` accept the following options

- `defautType:String` current application environment. Default to `app.get('env')` of express application 
- `environment:String` accepted response content types in the order of their significant. Valid types  are `json`, `html` and `text`. Default to `json`, `html` and `text`
- `types:[String]` default accepted response content type default to `json`

## Available response methods
All response methods accept the following `optional` parameters

- `view` an optional view name to use when render html response
- `data` optional response data based on response type, as some of response are not must to have response body
- `fn` an optional callback to invoke if rendering a view result to an error. [see expressjs render](http://expressjs.com/4x/api.html#res.render)

### 2xx methods

#### `ok(<view>, data, fn)`
```js
//json or jsonp response
response.ok(data);

//view response
response.ok('users',data);

//text response
response.ok('foo bar');
```

#### `created(<view>, data, fn)`
```js
//json or jsonp response
response.created(data);

//view response
response.created('users',data);

//text response
response.created('foo bar');
```

#### `accepted(<view>, data, fn)`
```js
//json or jsonp response
response.accepted(data);

//view response
response.accepted('users',data);

//text response
response.accepted('foo bar');
```

### `noContent()`
```js
//json or jsonp response
response.noContent();
```

### 3xx methods

#### `notModified(<view>, data, fn)`
```js
//json or jsonp response
response.notModified(data);

//view response
response.notModified('users',data);

//text response
response.notModified('foo bar');
```

### 4xx methods

#### `badRequest(<view>, error, fn)`
```js
//json or jsonp response
response.badRequest(error);

//view response
response.badRequest('users',error);

//text response
response.badRequest('foo bar');
```

#### `unauthorized(<view>, error, fn)`
```js
//json or jsonp response
response.unauthorized(error);

//view response
response.unauthorized('users',error);

//text response
response.unauthorized('foo bar');
```

#### `paymentRequired(<view>, error, fn)`
```js
//json or jsonp response
response.paymentRequired(error);

//view response
response.paymentRequired('users',error);

//text response
response.paymentRequired('foo bar');
```

#### `forbidden(<view>, error, fn)`
```js
//json or jsonp response
response.forbidden(error);

//view response
response.forbidded('users',error);

//text response
response.forbidden('foo bar');
```

#### `notFound(<view>, error, fn)`
```js
//json or jsonp response
response.notFound(error);

//view response
response.notFound('users',error);

//text response
response.notFound('foo bar');
```

#### `methodNotAllowed(<view>, error, fn)`
```js
//json or jsonp response
response.methodNotAllowed(error);

//view response
response.methodNotAllowed('users',error);

//text response
response.methodNotAllowed('foo bar');
```

#### `conflict(<view>, error, fn)`
```js
//json or jsonp response
response.conflict(error);

//view response
response.conflict('users',error);

//text response
response.conflict('foo bar');
```

### 5xx methods

#### `internalServerError(<view>, error, fn)`
```js
//json or jsonp response
response.internalServerError(error);

//view response
response.internalServerError('users',error);

//text response
response.internalServerError('foo bar');
```

#### `notImplemented(<view>, error, fn)`
```js
//json or jsonp response
response.notImplemented(error);

//view response
response.notImplemented('users',error);

//text response
response.notImplemented('foo bar');
```

#### `badGateway(<view>, error, fn)`
```js
//json or jsonp response
response.badGateway(error);

//view response
response.badGateway('users',error);

//text response
response.badGateway('foo bar');
```

#### `serviceUnavailable(<view>, error, fn)`
```js
//json or jsonp response
response.serviceUnavailable(error);

//view response
response.serviceUnavailable('users',error);

//text response
response.serviceUnavailable('foo bar');
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
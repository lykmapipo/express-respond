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
 
app.use(respond())
```

## Available response methods
All response methods accept the following `optional` parameters

- `view` an optional view name to use when render html response
- `data` optional response data based on response type, as some of response are not must to have response body
- `fn` an optional callback to invoke if rendering a view result to an error. [see expressjs render](http://expressjs.com/4x/api.html#res.render)

### 2xx methods
- `ok(<view>, data, fn)`
- `created(<view>, data, fn)`
- `accepted(<view>, data, fn)`
- `noContent(<view>, data, fn)`

### 3xx methods
- `notModified(<view>, data, fn)`

### 4xx methods
- `badRequest(<view>, data, fn)`
- `unauthorized(<view>, data, fn)`
- `paymentRequired(<view>, data, fn)`
- `forbidden(<view>, data, fn)`
- `notFound(<view>, data, fn)`
- `methodNotAllowed(<view>, data, fn)`
- `conflict(<view>, data, fn)`

### 5xx methods
- `internalServerError(<view>, data, fn)`
- `notImplemented(<view>, data, fn)`
- `badGateway(<view>, data, fn)`
- `serviceUnavailable(<view>, data, fn)`


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
express-respond
=====================

[![Build Status](https://travis-ci.org/lykmapipo/express-respond.svg?branch=master)](https://travis-ci.org/lykmapipo/express-respond)

HTTP responses middleware for [expressjs](https://github.com/strongloop/express/)

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

### 2xx methods
- `ok(<view_name>, data, fn)`
- `created(<view_name>, data, fn)`
- `accepted(<view_name>, data, fn)`
- `noContent(<view_name>, data, fn)`

### 3xx methods
- `notModified(<view_name>, data, fn)`

### 4xx methods
- `badRequest(<view_name>, data, fn)`
- `unauthorized(<view_name>, data, fn)`
- `paymentRequired(<view_name>, data, fn)`
- `forbidden(<view_name>, data, fn)`
- `notFound(<view_name>, data, fn)`
- `methodNotAllowed(<view_name>, data, fn)`
- `conflict(<view_name>, data, fn)`

### 5xx methods
- `internalServerError(<view_name>, data, fn)`
- `notImplemented(<view_name>, data, fn)`
- `badGateway(<view_name>, data, fn)`
- `serviceUnavailable(<view_name>, data, fn)`


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
import { merge } from 'lodash';
import express from 'express';
import respond from '../src';

const PORT = 3000;

// prepare express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '2mb' }));
app.use(respond);

// respond with 200
app.get('/', (request, response) => {
  const options = merge({}, request.query);
  response.ok(options);
});

// respond with error
app.use((error, request, response, next) => {
  response.error(error);
});

// run express app
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  } else {
    console.log(`visit http://0.0.0.0:${PORT}`);
  }
});

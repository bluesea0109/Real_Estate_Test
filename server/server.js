const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./helpers/error-handler');
const rateLimiter = require('./helpers/rate-limiter');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use('/api', router);
app.use(errorHandler);
app.use(rateLimiter);

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});

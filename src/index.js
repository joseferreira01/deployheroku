const express = require('express');
require( 'dotenv/config');
const routes = require('./routes');
const { errors } = require('celebrate');
const swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('../swagger.json')
const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
//app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header('Access-Control-Expose-Headers', 'X-Total-Count')

  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  next();
});




app.use(routes);
app.use('/api-doc',swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(errors());
// ff

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

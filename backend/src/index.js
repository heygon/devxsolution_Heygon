const express    = require('express');
const cors       = require('cors');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? 'env.test' : '.env'
})

const client = require('../database/config');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('DevXSolutions developer challenge');
});

app.use('/', require('./router'));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(3000);
console.log('Servidor rodando na posta 3678');
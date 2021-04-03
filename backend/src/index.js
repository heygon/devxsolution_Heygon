const express    = require('express');
const cors       = require('cors');
const swaggerUi  = require('swagger-ui-express')
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? 'env.test' : '.env'
})

const client = require('../database/config');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('DevXSolutions developer challenge');
});

app.use('/', require('./router'));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(require('../swagger_output.json')))

app.listen(3000);
console.log('Servidor rodando na posta 3678');
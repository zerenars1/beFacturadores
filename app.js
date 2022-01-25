const express = require('express');
const cors = require('cors');
const rutas = require('./src/routes');
const { handleError } = require('./src/middlewares');
const { checkCouchDB } = require('./src/helpers/couchDB');
const axiosLoger = require('./src/helpers/axiosLogger');

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    maxAge: 3600,
    preflightContinue: false,
  })
);

// Algunas cuestiones para estar detrás de NGINX
app.set('trust proxy', true);
app.set('strict routing', true);
app.set('case sensitive routing', true);

// Cambia el header X-Powered-By
function xPoweredBy(req, res, next) {
  res.header('X-Powered-By', 'REDISA S.A. <redisa.com.py>');
  res.header('X-Hello-Human', 'Somos @redisa, Escribinos a <info@redisa.com.py>');
  next();
}

app.set('x-powered-by', false);
app.use(xPoweredBy);

// capturar todas peticiones de axios
checkCouchDB();
axiosLoger();

app.use('/facturadores', rutas);
app.use(handleError);

app.use((req, res, next) => {
  const date = new Date();
  res.status(404).json({
    succes: false,
    timestamp: date,
    address: `${req.ip} ${req.ips || ''}`,
    method: req.method,
    originalUrl: req.originalUrl,
    message: `404 - ${req.originalUrl} Not Found `,
    author: `REDISA S.A. ${date.getFullYear()} ! -  REDISA - Core`,
  });
  next();
});

module.exports = app;

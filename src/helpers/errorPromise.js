const createError = require('http-errors');

const errorPromise = (codigo, mensaje) => Promise.reject(createError(codigo, mensaje));

const errorIfNil = (codigo, mensaje) => (valor) => (!valor ? errorPromise(codigo, mensaje) : valor);

module.exports = { errorPromise, errorIfNil };

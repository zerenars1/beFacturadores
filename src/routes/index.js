const router = require('express').Router();
const { construirOperacion } = require('../controllers/Operaciones/consulta.controllers');

router.get('/consulta', construirOperacion);

module.exports = router;

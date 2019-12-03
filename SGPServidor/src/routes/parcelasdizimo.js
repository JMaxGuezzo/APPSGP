const express = require('express');
const router = express.Router();

const controller = require('../controllers/parcelasdizimo.js');

//rota de cadastro
router.post('/', function (req, res, next) {
    controller.cadastro(req , res, next)
});

//rota de busca de todas os 
router.get('/', function (req, res, next) {
    controller.listagem(req , res, next)
});

//rota de busca por Id
router.get('/:parcelasdizimoId', function (req, res, next) {
    controller.buscaPorId(req , res, next)
});

// rota para edição de usuario por ID
router.put('/:parcelasdizimoId', function (req, res, next) {
    controller.remocao(req , res, next)
});

router.delete('/:parcelasdizimoId', function (req, res, next) {
    controller.remocao(req , res, next);
});

module.exports = router;

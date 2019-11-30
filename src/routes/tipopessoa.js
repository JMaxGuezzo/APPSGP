const express = require('express');
const router = express.Router();
const controller = require('../controllers/tipopessoa');

//rota de cadastro
router.post('/', function (req, res, next) {
    controller.cadastro(req , res, next)
});

//rota de busca de todas os 
router.get('/', function (req, res, next) {
    controller.listagem(req , res, next)
});

//rota de busca por Id
router.get('/:tipopessoaId', function (req, res, next) {
    controller.buscaPorId(req , res, next)
});

// rota para edição de usuario por ID
router.put('/:tipopessoaId', function (req, res, next) {
    controller.edicao(req , res, next);
});

module.exports = router;

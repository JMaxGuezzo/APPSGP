const express = require('express');
const router = express.Router();
const { Usuario } = require('../models/index')

const controller = require('../controllers/usuarios');

/*******
 * TODO: Definição das rotas do CRUD de Usuários e Login.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 
 *******/
//rota de cadastro
router.post('/', function (req, res, next) {
    controller.cadastro(req , res, next)
});

//rota de busca por Id
router.get('/:usuarioId', function (req, res, next) {
    controller.buscaPorId(req , res, next)
});

// rota para edição de usuario por ID
router.put('/:usuarioId', function (req, res, next) {
    controller.edicao(req , res, next);
});

module.exports = router;

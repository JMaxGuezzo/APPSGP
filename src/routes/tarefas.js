const express = require('express');
const router = express.Router();

const { authenticationMiddleware } = require('../utils/token');
const controller = require('../controllers/tarefas');

/*******
 * TODO: Definição das rotas do CRUD de Tarefas.
 * Exemplo:
 * 
 * const validateBody = {
 *   // Schema de validação do Express Validator
 * };
 * 
 * 
 * router.post('/',
 *   authenticationMiddleware,
 *   controller.cadastro,
 * );
 *******/

 //rota de cadastro
router.post('/', function (req, res, next) {
    controller.cadastro(req , res, next)
});

//rota de busca de todas as tarefas
router.get('/', function (req, res, next) {
    controller.listagem(req , res, next)
});

//rota de busca por Id
router.get('/:tarefaId', function (req, res, next) {
    controller.buscaPorId(req , res, next)
});

//Alterar a tarefa
router.put('/:tarefaId', function (req, res, next) {
    controller.edicao(req , res, next)
});

//remover tarefa
router.delete('/:tarefaId', function (req, res, next) {
    controller.remocao(req , res, next)
});

//alterar tarefa para concluida
router.put('/:tarefaId/concluida', function (req, res, next) {
    controller.marcarConcluida(req , res, next)
});

//remover tarefa como concluida
router.delete('/:tarefaId/concluida', function (req, res, next) {
    controller.desmarcarConcluida(req , res, next)
});



// rota para edição por ID
router.put('/:usuarioId', function (req, res, next) {
    controller.edicao(req , res, next);
});




module.exports = router;

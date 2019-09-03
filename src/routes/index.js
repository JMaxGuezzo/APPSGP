const express = require('express');
const router = express.Router();

/**
 * Definição dos arquivos de rotas.
 */

const fiel = require('./fiel');
//const tarefas = require('./tarefas');
const comunidade = require('./comunidade');
const ceb = require('./ceb');
const cidade = require('./cidade');
const civil = require('./civil');
const estado = require('./estado');


router.use('/fiel', fiel);
//router.use('/tarefas', tarefas);
router.use('/comunidade', comunidade);
router.use('/ceb', ceb);
router.use('/cidade', cidade);
router.use('/civil', civil);
router.use('/estado', estado);

module.exports = router;

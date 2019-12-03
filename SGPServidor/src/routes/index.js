const express = require('express');
const router = express.Router();

/**
 * Definição dos arquivos de rotas.
 */

const pessoa = require('./pessoa');
const comunidade = require('./comunidade');
const ceb = require('./ceb');
const cidade = require('./cidade');
const estado = require('./estado');
const tipopessoa = require('./tipopessoa');
const tipoagendamento = require('./tipoagendamento');
const localvisita = require('./localvisita');
const agendamento = require('./agendamento');
const parcelasdizimo = require('./parcelasdizimo');


router.use('/pessoa', pessoa);
router.use('/tipopessoa', tipopessoa);
router.use('/comunidade', comunidade);
router.use('/ceb', ceb);
router.use('/cidade', cidade);
router.use('/estado', estado);
router.use('/tipoagendamento', tipoagendamento);
router.use('/localvisita', localvisita);
router.use('/agendamento', agendamento);
router.use('/parcelasdizimo', parcelasdizimo);

module.exports = router;

const { TipoMovimento } = require('../models/index')

function cadastro(request, response, next) {
    const tipoMovimento = request.body;
    TipoMovimento.create(tipoMovimento)
      .then(function (tipoMovimentoCriado) {
        response.status(201).json(tipoMovimentoCriado)
      })
      .catch(function (error) {
        response.status(422).send(error);
          }
        )
}

function listagem(request, response, next) {
    
  TipoMovimento.findAll({
      attributes: ['nome'],
      
    })
      .then(function (tipoMovimento) {
        response.status(200).json(tipoMovimento)
      })
      .catch(function (error) {
        response.status(422).send(error)
      })
    };


function buscaPorId(request, response, next) {
  const tipoMovimentoId = request.params.TipoMovimentoId
  TipoMovimento.findByPk(tipoMovimentoId)
    .then(function (tipoMovimento) {
      if (tipoMovimento) {
        const tipoMovimentoJson = tipoMovimento.toJSON()
        response.status(200).json(tipoMovimentoJson)
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      response.status(422).send(error)
    })
};

function edicao(request, response, next) {
  const tipoMovimentoId = request.params.TipoMovimentoId
  const body = request.body
  TipoMovimento.findByPk(tipoMovimentoId)
    .then(function (tipoMovimento) {
      if (TipoMovimento) {
        return TipoMovimento.update(body)
          .then(function (tipoMovimentoAtualizado) {
            const TipoMovimentoJson = TipoMovimentoAtualizado.toJSON()
            response.status(200).json(TipoMovimentoJson)
          })
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      response.status(422).send(error)
    })
};

function login(request, response, next) {

}

module.exports = {
    cadastro,
    listagem,
    buscaPorId,
    edicao,
    login,
};
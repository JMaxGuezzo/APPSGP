const { TipoAgendamento } = require('../models/index')

function cadastro(request, response, next) {
    const tipoAgendamento = request.body;
    TipoAgendamento.create(tipoAgendamento)
      .then(function (tipoAgendamentoCriado) {
        response.status(201).json(tipoAgendamentoCriado)
      })
      .catch(function (error) {
        response.status(422).send(error);
          }
        )
}

function listagem(request, response, next) {
    
  TipoAgendamento.findAll({
      attributes: ['nome'],
      
    })
      .then(function (tipoAgendamento) {
        response.status(200).json(tipoAgendamento)
      })
      .catch(function (error) {
        response.status(422).send(error)
      })
    };


function buscaPorId(request, response, next) {
  const tipoAgendamentoId = request.params.tipoagendamentoId
  TipoAgendamento.findByPk(tipoAgendamentoId)
    .then(function (tipoAgendamento) {
      if (tipoAgendamento) {
        const tipoAgendamentoJson = tipoAgendamento.toJSON()
        response.status(200).json(tipoAgendamentoJson)
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      response.status(422).send(error)
    })
};

function edicao(request, response, next) {
  const tipoAgendamentoId = request.params.tipoagendamentoId
  const body = request.body
  TipoAgendamento.findByPk(tipoAgendamentoId)
    .then(function (TipoAgendamento) {
      if (TipoAgendamento) {
        return TipoAgendamento.update(body)
          .then(function (tipoAgendamentoAtualizado) {
            const TipoAgendamentoJson = tipoAgendamentoAtualizado.toJSON()
            response.status(200).json(TipoAgendamentoJson)
          })
      } else {
        response.status(404).send('Nao foi possivel Encontrar o Caminho.')
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
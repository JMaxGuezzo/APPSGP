const { Estado } = require('../models/index')

function cadastro(request, response, next) {
    const estado = request.body;
    Estado.create(estado)
      .then(function (estadoCriado) {
        response.status(201).json(estadoCriado)
      })
      .catch(function (error) {
            response.status(422).send(error);
          }
        )}

function listagem(request, response, next) {
    
  Estado.findAll({
      attributes: ['id','nome', 'sigla'],
      
    })
      .then(function (estado) {
        response.status(200).json(estado)
      })
      .catch(function (error) {
        response.status(422).send(error)
      })
    };


function buscaPorId(request, response, next) {
  const estadoId = request.params.estadoId
  Estado.findByPk(estadoId)
    .then(function (estado) {
      if (estado) {
        const estadoJson = estado.toJSON()
        response.status(200).json(estadoJson)
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      response.status(422).send(error)
    })
};

function edicao(request, response, next) {
  const estadoId = request.params.estadoId
  const body = request.body
  Estado.findByPk(estadoId)
    .then(function (estado) {
      if (estado) {
        return estado.update(body)
          .then(function (estadoAtualizado) {
            const estadoJson = estadoAtualizado.toJSON()
            response.status(200).json(estadoJson)
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
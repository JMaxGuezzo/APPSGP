const { Comunidade, Ceb } = require('../models/index')

function cadastro(request, response, next) {
    const comunidade = request.body;
    Comunidade.create(comunidade)
      .then(function (comunidadeCriada) {
        response.status(201).json(comunidadeCriada)
      })
      .catch(function (error) {
            response.status(422).send(error);
          }
      )};

function listagem(request, response, next) {
  Comunidade.findAll({
    attributes: ['nome'],
    include: [
      {
        model: Ceb,
        as: 'comunidadeceb',
        attributes: ['nome']
      },    
    ]})
      .then(function (comunidade) {
        response.status(200).json(comunidade)
      })
      .catch(function (error) {
        console.log(error)
        response.status(422).send()
      })
    };

function buscaPorId(request, response, next) {
  const comunidadeId = request.params.comunidadeId
  Comunidade.findByPk(comunidadeId)
    .then(function (comunidade) {
      if (comunidade) {
        const comunidadeJson = comunidade.toJSON()
        response.status(200).json(comunidadeJson)
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      console.log(error)
      response.status(422).send()
    })
};

function edicao(request, response, next) {
  const comunidadeId = request.params.comunidadeId
  const body = request.body
  Comunidade.findByPk(comunidadeId)
    .then(function (comunidade) {
      if (comunidade) {
        return comunidade.update(body)
          .then(function (comunidadeAtualizado) {
            const comunidadeJson = comunidadeAtualizado.toJSON()
            response.status(200).json(comunidadeJson)
          })
      } else {
        response
        .status(404).send()
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
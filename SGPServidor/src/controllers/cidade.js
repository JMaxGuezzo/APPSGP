const { Cidade, Estado } = require('../models/index');

function cadastro(request, response, next) {
    const cidade = request.body;
    Cidade.create(cidade)
      .then(function (cidadeCriada) {
        response.status(201).json(cidadeCriada)
      })
      .catch(function (error) {
        response.status(422).send('Falha ao inserir Cidade: ' + error);
        }
      )}

function listagem(request, response, next) {
    
  Cidade.findAll({
    attributes: ['id','nome'],
        include: [
          {
            model: Estado,
            as: 'cidadeestado',
            attributes: ['nome']
          },    
    ]})
      .then(function (cidade) {
        response.status(200).json(cidade)
      })
      .catch(function (error) {
        console.log(error)
        response.status(422).send()
      })
    };


function buscaPorId(request, response, next) {
  const cidadeId = request.params.cidadeId
  Cidade.findByPk(cidadeId)
    .then(function (cidade) {
      if (cidade) {
        const cidadeJson = cidade.toJSON()
        response.status(200).json(cidadeJson)
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      response.status(422).send()
    })
};

function edicao(request, response, next) {
  const cidadeId = request.params.cidadeId
  const body = request.body
  Cidade.findByPk(cidadeId)
    .then(function (cidade) {
      if (cidade) {
        return cidade.update(body)
          .then(function (cidadeAtualizado) {
            const cidadeJson = cidadeAtualizado.toJSON()
            response.status(200).json(cidadeJson)
          })
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      response.status(422).send("Nao foi possivel ALterar: " + error)
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
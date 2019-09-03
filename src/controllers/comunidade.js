const { Comunidade } = require('../models/index')

function cadastro(request, response, next) {
    const comunidade = request.body;
    Comunidade.create({
      nome: comunidade.nome
       
    })
      .then(function (comunidadeCriada) {
        // usuário inserido com sucesso
        delete comunidadeCriada.senha;
        response.status(201).json(comunidadeCriada)
      })
      .catch(function (error) {
        // falha ao inserior o usuário
        if (Array.isArray(error.errors)) {
          const sequelizeError = error.errors[0]
          if (sequelizeError.type === 'unique violation'
            && sequelizeError.path === 'email') {
            response.status(422).send('O e-mail informado já existe no banco de dados.');
            return;
          }
        }
        response.status(422).send();
      })
}

function listagem(request, response, next) {
    
  Comunidade.findAll({
      attributes: ['id', 'nome'],
      
    })
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
        return comunidade.update({
          nome: body.nome,
        })
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
      console.log(error)
      response.status(422).send()
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
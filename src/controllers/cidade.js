const { Cidade } = require('../models/index')

function cadastro(request, response, next) {
    const cidade = request.body;
    Cidade.create({
      nome: cidade.nome
       // estudar sobre hash de senha com bcrypt
    })
      .then(function (cidadeCriado) {
        // usuário inserido com sucesso
        delete cidadeCriado.senha;
        response.status(201).json(cidadeCriado)
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
    
  Cidade.findAll({
      attributes: ['id', 'nome'],
      
    })
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
      console.log(error)
      response.status(422).send()
    })
};

function edicao(request, response, next) {
  const cidadeId = request.params.cidadeId
  const body = request.body
  Cidade.findByPk(cidadeId)
    .then(function (cidade) {
      if (cidade) {
        return cidade.update({
          nome: body.nome,
        })
          .then(function (cidadeAtualizado) {
            const cidadeJson = cidadeAtualizado.toJSON()
            response.status(200).json(cidadeJson)
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
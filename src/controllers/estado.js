const { Estado } = require('../models/index')

function cadastro(request, response, next) {
    const estado = request.body;
    Estado.create({
      nome: estado.nome
       // estudar sobre hash de senha com bcrypt
    })
      .then(function (estadoCriado) {
        // usuário inserido com sucesso
        delete estadoCriado.senha;
        response.status(201).json(estadoCriado)
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
    
  Estado.findAll({
      attributes: ['id', 'nome'],
      
    })
      .then(function (estado) {
        response.status(200).json(estado)
      })
      .catch(function (error) {
        console.log(error)
        response.status(422).send()
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
      console.log(error)
      response.status(422).send()
    })
};

function edicao(request, response, next) {
  const estadoId = request.params.estadoId
  const body = request.body
  Estado.findByPk(estadoId)
    .then(function (estado) {
      if (estado) {
        return estado.update({
          nome: body.nome,
        })
          .then(function (estadoAtualizado) {
            const estadoJson = estadoAtualizado.toJSON()
            response.status(200).json(estadoJson)
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
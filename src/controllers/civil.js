const { Civil } = require('../models/index')

function cadastro(request, response, next) {
    const civil = request.body;
    Civil.create({
      nome: civil.nome
       // estudar sobre hash de senha com bcrypt
    })
      .then(function (civilCriado) {
        response.status(201).json(civilCriado)
      })
      .catch(function (error) {
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
    
  Civil.findAll({
      attributes: ['id', 'nome'],
      
    })
      .then(function (civil) {
        response.status(200).json(civil)
      })
      .catch(function (error) {
        console.log(error)
        response.status(422).send()
      })
    };


function buscaPorId(request, response, next) {
  const civilId = request.params.civilId
  Civil.findByPk(civilId)
    .then(function (civil) {
      if (civil) {
        const civilJson = civil.toJSON()
        response.status(200).json(civilJson)
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
  const civilId = request.params.civilId
  const body = request.body
  Civil.findByPk(civilId)
    .then(function (civil) {
      if (civil) {
        return civil.update({
          nome: body.nome,
        })
          .then(function (civilAtualizado) {
            const civilJson = civilAtualizado.toJSON()
            response.status(200).json(civilJson)
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
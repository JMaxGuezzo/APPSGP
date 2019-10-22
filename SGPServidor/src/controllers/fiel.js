const { Fiel } = require('../models/index')

function cadastro(request, response, next) {
    const fiel = request.body;
    Fiel.create({
      nome: fiel.nome
       // estudar sobre hash de senha com bcrypt
    })
      .then(function (fielCriado) {
        // usuário inserido com sucesso
        delete fielCriado.senha;
        response.status(201).json(fielCriado)
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
    
  Fiel.findAll()
      .then(function (fiel) {
        response.status(200).json(fiel)
      })
      .catch(function (error) {
        console.log(error)
        response.status(422).send()
      })
    };


function buscaPorId(request, response, next) {
  const fielId = request.params.fielId
  Fiel.findByPk(fielId)
    .then(function (fiel) {
      if (fiel) {
        const fielJson = fiel.toJSON()
        response.status(200).json(fielJson)
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
  const fielId = request.params.fielId
  const body = request.body
  Fiel.findByPk(fielId)
    .then(function (fiel) {
      if (fiel) {
        return fiel.update({
          nome: body.nome,
        })
          .then(function (fielAtualizado) {
            const fielJson = fielAtualizado.toJSON()
            response.status(200).json(fielJson)
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
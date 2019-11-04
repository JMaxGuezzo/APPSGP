const { Ceb } = require('../models/index')
const { Comunidade } = require('../models/index')

function cadastro(request, response, next) {
    const ceb = request.body;
    Ceb.create(ceb)
      .then(function (cebCriado) {
        // usuário inserido com sucesso
        delete cebCriado.senha;
        response.status(201).json(cebCriado)
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
    
  Ceb.findAll({
    attributes: ['id','nome']
})
      .then(function (ceb) {
        response.status(200).json(ceb)
      })
      .catch(function (error) {
        console.log(error)
        response.status(422).send()
      })
    };


function buscaPorId(request, response, next) {
  const cebId = request.params.cebId
  Ceb.findByPk(cebId)
    .then(function (ceb) {
      if (ceb) {
        const cebJson = ceb.toJSON()
        response.status(200).json(cebJson)
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
  const cebId = request.params.cebId
  const body = request.body
  Ceb.findByPk(cebId)
    .then(function (ceb) {
      if (ceb) {
        return ceb.update({
          nome: body.nome,
        })
          .then(function (cebAtualizado) {
            const cebJson = cebAtualizado.toJSON()
            response.status(200).json(cebJson)
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
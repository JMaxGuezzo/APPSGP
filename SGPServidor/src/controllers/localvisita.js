const { 
  LocalVisita,
  Cidade } = require('../models/index')

function cadastro(request, response, next) {
    const localvisita = request.body;
    LocalVisita.create(localvisita)
      .then(function (localvisitaCriado) {
        response.status(201).json(localvisitaCriado)
      })
      .catch(function (error) {
            response.status(422).send(error);
          }
        )}

function listagem(request, response, next) {
    
  LocalVisita.findAll({
      attributes: [
        'nomelocal',  
        'endereco',
        'numcasa',
        'bairro',
        'telefone',
      ],
      include: [
        {
          model: Cidade,
          as: 'visitacidade',
          attributes: ['nome']
        },
      ]
      
    })
      .then(function (localvisita) {
        response.status(200).json(localvisita)
      })
      .catch(function (error) {
        console.log(error)
        response.status(422).send()
      })
    };


function buscaPorId(request, response, next) {
  const localvisitaId = request.params.localvisitaId
  LocalVisita.findByPk(localvisitaId)
    .then(function (localvisita) {
      if (localvisita) {
        const localvisitaJson = localvisita.toJSON()
        response.status(200).json(localvisitaJson)
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
  const LocalvisitaId = request.params.localvisitaId
  const body = request.body
  LocalVisita.findByPk(LocalvisitaId)
    .then(function (LocalVisita) {
      if (LocalVisita) {
        return LocalVisita.update(body)
          .then(function (localvisitaAtualizado) {
            const localvisitaJson = localvisitaAtualizado.toJSON()
            response.status(200).json(localvisitaJson)
          })
      } else {
        response.status(404).send('Nao foi possivel Encontrar o caminho' +LocalVisita)
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
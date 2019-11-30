const { TipoPessoa } = require('../models/index')

function cadastro(request, response, next) {
    const tipoPessoa = request.body;
    TipoPessoa.create(tipoPessoa)
      .then(function (tipoPessoaCriado) {
        response.status(201).json(tipoPessoaCriado)
      })
      .catch(function (error) {
        response.status(422).send(error);
          }
        )
}

function listagem(request, response, next) {
    
  TipoPessoa.findAll({
      attributes: ['id','nome'],
      
    })
      .then(function (tipoPessoa) {
        response.status(200).json(tipoPessoa)
      })
      .catch(function (error) {
        response.status(422).send(error)
      })
    };


function buscaPorId(request, response, next) {
  const tipoPessoaId = request.params.tipopessoaId
  TipoPessoa.findByPk(tipoPessoaId)
    .then(function (tipoPessoa) {
      if (tipoPessoa) {
        const tipoPessoaJson = tipoPessoa.toJSON()
        response.status(200).json(tipoPessoaJson)
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      response.status(422).send(error)
    })
};

function edicao(request, response, next) {
  const tipoPessoaId = request.params.tipopessoaId
  const body = request.body
  TipoPessoa.findByPk(tipoPessoaId)
    .then(function (TipoPessoa) {
      if (TipoPessoa) {
        return TipoPessoa.update(body)
          .then(function (tipoPessoaAtualizado) {
            const TipoPessoaJson = tipoPessoaAtualizado.toJSON()
            response.status(200).json(TipoPessoaJson)
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
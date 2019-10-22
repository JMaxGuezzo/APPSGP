const { 
  Pessoa, 
  Comunidade, 
  TipoPessoa,
  Cidade } = require('../models/index')

function cadastro(request, response, next) {
    const pessoa = request.body;
    Pessoa.create(pessoa)
      .then(function (PessoaCriado) {
        response.status(201).json(PessoaCriado)
      })
      .catch(function (error) {
            response.status(422).send(error);
          }
        )}

function listagem(request, response, next) {
    
  Pessoa.findAll({
      attributes: [
        'id',
        'nome', 
        'datanasc', 
        'endereco',
        'numcasa',
        'bairro',
        'telefone',
        'complemento',
        'rg',
        'cpf',
        'celular',
        'situacao',
      ],
      include: [
        {
          model: Comunidade,
          as: 'pessoacomunidade',
          attributes: ['nome']
        },
        {
          model: TipoPessoa,
          as: 'pessoatipo',
          attributes: ['nome']
        },
        {
          model: Cidade,
          as: 'pessoacidade',
          attributes: ['nome']
        },
      ]
      
    })
      .then(function (Pessoa) {
        response.status(200).json(Pessoa)
      })
      .catch(function (error) {
        console.log(error)
        response.status(422).send()
      })
    };


function buscaPorId(request, response, next) {
  const PessoaId = request.params.pessoaId
  Pessoa.findByPk(PessoaId)
    .then(function (Pessoa) {
      if (Pessoa) {
        const PessoaJson = Pessoa.toJSON()
        response.status(200).json(PessoaJson)
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
  const PessoaId = request.params.pessoaId
  const body = request.body
  Pessoa.findByPk(PessoaId)
    .then(function (Pessoa) {
      if (Pessoa) {
        return Pessoa.update(body)
          .then(function (PessoaAtualizado) {
            const PessoaJson = PessoaAtualizado.toJSON()
            response.status(200).json(PessoaJson)
          })
      } else {
        response.status(404).send('Nao foi possivel Alterar')
      }
    })
    .catch(function (error) {
      console.log(error)
      response.status(422).send('nao foi possivel alterar' + error)
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
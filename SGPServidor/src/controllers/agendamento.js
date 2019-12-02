const { 
  Pessoa, 
  LocalVisita, 
  TipoAgendamento, 
  Agendamento } = require('../models/index');

function cadastro(request, response, next) {
    const agendamento = request.body;
    Agendamento.create(agendamento)
      .then(function (agendamentoCriada) {
        response.status(201).json(agendamentoCriada)
      })
      .catch(function (error) {
        response.status(422).send('Falha ao inserir agendamento: ' + error);
        }
      )}

function listagem(request, response, next) {
    
  Agendamento.findAll({
    attributes: ['id', 'idsacerdote', 'descricao' ],
        include: [
          {
            model: Pessoa,
            as: 'agendapessoa',
            attributes: ['id','nome', 'telefone', 'idtipopessoa',
          ]
          },
          {
            model: LocalVisita,
            as: 'agendalocal',
            attributes: ['id','nomelocal', 'endereco', 'bairro', 'numcasa']
          },
          {
            model: TipoAgendamento,
            as: 'agendatipo',
            attributes: ['id','nome']
          },    
    ]})
      .then(function (agendamento) {
        response.status(200).json(agendamento)
      })
      .catch(function (error) {
        console.log(error)
        response.status(422).send()
      })
    };


function buscaPorId(request, response, next) {
  const agendamentoId = request.params.agendamentoId
  Agendamento.findByPk(agendamentoId , {
    attributes: ['id', 'idsacerdote', 'descricao' ],
        include: [
          {
            model: Pessoa,
            as: 'agendapessoa',
            attributes: ['id','nome', 'telefone', 'idtipopessoa',
          ]
          },
          {
            model: LocalVisita,
            as: 'agendalocal',
            attributes: ['id','nomelocal', 'endereco', 'bairro', 'numcasa']
          },
          {
            model: TipoAgendamento,
            as: 'agendatipo',
            attributes: ['id','nome']
          },    
    ]} 
    )
    .then(function (agendamento) {
      if (agendamento) {
        const agendamentoJson = agendamento.toJSON()
        response.status(200).json(agendamentoJson)
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      response.status(422).send()
    })
};

function edicao(request, response, next) {
  const agendamentoId = request.params.agendamentoId
  const body = request.body
  Agendamento.findByPk(agendamentoId)
    .then(function (agendamento) {
      if (agendamento) {
        return agendamento.update(body)
          .then(function (agendamentoAtualizado) {
            const agendamentoJson = agendamentoAtualizado.toJSON()
            response.status(200).json(agendamentoJson)
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
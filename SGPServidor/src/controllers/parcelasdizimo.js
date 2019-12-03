const { ParcelasDizimo, Pessoa } = require('../models/index');

function cadastro(request, response, next) {
    const parcelasdizimo = request.body;
    ParcelasDizimo.create(parcelasdizimo)
      .then(function (parcelasdizimoCriada) {
        response.status(201).json(parcelasdizimoCriada)
      })
      .catch(function (error) {
        response.status(422).send('Falha ao inserir Parcela: ' + error);
        }
      )}

function listagem(request, response, next) {
    
    ParcelasDizimo.findAll({
    attributes: ['id','valor', 'datapgto'],
        include: [
          {
            model: Pessoa,
            as: 'pessoa',
            attributes: ['id','nome']
          },    
    ]})
      .then(function (parcelasdizimo) {
        response.status(200).json(parcelasdizimo)
      })
      .catch(function (error) {
        console.log(error)
        response.status(422).send()
      })
    };


function buscaPorId(request, response, next) {
  const parcelasdizimoId = request.params.parcelasdizimoId
  ParcelasDizimo.findByPk(parcelasdizimoId)
    .then(function (parcelasdizimo) {
      if (parcelasdizimo) {
        const parcelasdizimoJson = parcelasdizimo.toJSON()
        response.status(200).json(parcelasdizimoJson)
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      response.status(422).send()
    })
};

function edicao(request, response, next) {
  const parcelasdizimoId = request.params.parcelasdizimoId
  const body = request.body
  ParcelasDizimo.findByPk(parcelasdizimoId)
    .then(function (parcelasdizimo) {
      if (parcelasdizimo) {
        return parcelasdizimo.update(body)
          .then(function (parcelasdizimoAtualizado) {
            const parcelasdizimoJson = parcelasdizimoAtualizado.toJSON()
            response.status(200).json(parcelasdizimoJson)
          })
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      response.status(422).send("Nao foi possivel alterar a parcela: " + error)
    })
};

function login(request, response, next) {

}

function remocao(request, response, next) {
    const parcelasdizimoId = request.params.parcelasdizimoId

    ParcelasDizimo.destroy({
      where: {
        id: parcelasdizimoId
      }
    })
      .then(function (removidos) {
        if (removidos > 0) {
          response.status(200).send("Parcela Removida Com Sucesso")
        } else {
          response.status(404).send()
        }
      })
      .catch(function (error) {
        console.log(error)
        // res.status(422).send()
        next(error) // delega o tratamento de erro para o express
      })
}

module.exports = {
    cadastro,
    listagem,
    buscaPorId,
    edicao,
    login,
    remocao,
};
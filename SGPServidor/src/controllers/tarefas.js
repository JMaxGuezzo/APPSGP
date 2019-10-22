const { Tarefa } = require('../models/index')

function cadastro(request, response, next) {
    const tarefa = request.body;
    Tarefa.create({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      concluido: false,
    })
      .then(function (tarefaCriada) {

        response.status(201).json(tarefaCriada)
      })
      .catch(function (error) {
        // falha ao inserior a tarefa
        if (Array.isArray(error.errors)) {
          const sequelizeError = error.errors[0]
            response.status(422).send('falha ao inserir tarefa no banco de dados');
            return;
          }
          response.status(422).send(error);
        }
    )
}

function listagem(request, response, next) {
    
    Tarefa.findAll({
        attributes: ['id', 'titulo', 'descricao', 'concluido'],
        
      })
        .then(function (tarefa) {
          response.status(200).json(tarefa)
        })
        .catch(function (error) {
          console.log(error)
          response.status(422).send()
        })




    //const tarefa = request.params;
//   Tarefa.FindAll()
//     .then(function (tarefa) {
//       if (tarefa) {
//         const tarefaJson = tarefa.toJSON()
//         response.status(200).json(tarefaJson)
//       } else {
//         response.status(404).send()
//       }
//     })
//     .catch(function (error) {
//       console.log(error)
//       response.status(422).send()
//     })
}

function buscaPorId(request, response, next) {
    const tarefaId = request.params.tarefaId
  Tarefa.findByPk(tarefaId)
    .then(function (tarefa) {
      if (tarefa) {
        const tarefaJson = tarefa.toJSON()
        response.status(200).json(tarefaJson)
      } else {
        response.status(404).send()
      }
    })
    .catch(function (error) {
      console.log(error)
      response.status(422).send()
    })
}

function edicao(request, response, next) {
 const tarefaId = request.params.tarefaId
  const body = request.body
  Tarefa.findByPk(tarefaId)
    .then(function (tarefa) {
      if (tarefa) {
        return tarefa.update({
          titulo: body.titulo,
          descricao: body.descricao,
          })
          .then(function (tarefaAtualizada) {
            const tarefaJson = tarefaAtualizada.toJSON()
            response.status(200).json(tarefaJson)
          })
      } else {
        response.status(404).send()
      }
}
    )
}

function remocao(request, response, next) {
    const tarefaId = request.params.tarefaId

    Tarefa.destroy({
      where: {
        id: tarefaId
      }
    })
      .then(function (removidos) {
        if (removidos > 0) {
          response.status(200).send("Tarefa Removida Com Sucesso")
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

function marcarConcluida(request, response, next) {
    const tarefaId = request.params.tarefaId
  Tarefa.findByPk(tarefaId)
    .then(function (tarefa) {
      if (tarefa) {
        return tarefa.update({
          concluido: true,
          })
          .then(function (tarefaConcluida) {
            const tarefaJson = tarefaConcluida.toJSON()
            response.status(200).json("Tarefa concluida com sucesso," + tarefaJson)
          })
      } else {
        response.status(404).send()
      }
}
    )
}

function desmarcarConcluida(request, response, next) {
    const tarefaId = request.params.tarefaId
  Tarefa.findByPk(tarefaId)
    .then(function (tarefa) {
      if (tarefa) {
        return tarefa.update({
          concluido: false,
          })
          .then(function (tarefaConcluida) {
            const tarefaJson = tarefaConcluida.toJSON()
            response.status(200).json("Tarefa desmarcada como concluida com sucesso," + tarefaJson)
          })
      } else {
        response.status(404).send()
      }
}
    )
}

module.exports = {
    cadastro,
    listagem,
    buscaPorId,
    edicao,
    remocao,
    marcarConcluida,
    desmarcarConcluida,
};

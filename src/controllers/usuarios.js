const { Usuario } = require('../models/index')

function cadastro(request, response, next) {
    const usuario = request.body;
    Usuario.create({
      nome: usuario.nome,
      email: usuario.email,
      nascimento: usuario.nascimento,
      senha: usuario.senha, // estudar sobre hash de senha com bcrypt
    })
      .then(function (usuarioCriado) {
        // usuário inserido com sucesso
        delete usuarioCriado.senha;
        response.status(201).json(usuarioCriado)
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

function buscaPorId(request, response, next) {
  const usuarioId = request.params.usuarioId
  Usuario.findByPk(usuarioId)
    .then(function (usuario) {
      if (usuario) {
        const usuarioJson = usuario.toJSON()
        delete usuarioJson.senha
        response.status(200).json(usuarioJson)
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
  const usuarioId = request.params.usuarioId
  const body = request.body
  Usuario.findByPk(usuarioId)
    .then(function (usuario) {
      if (usuario) {
        return usuario.update({
          nome: body.nome,
          email: body.email,
          nascimento: body.nascimento,
          senha: body.senha, // criar uma específica para alterar a senha
        })
          .then(function (usuarioAtualizado) {
            const usuarioJson = usuarioAtualizado.toJSON()
            delete usuarioJson.senha
            response.status(200).json(usuarioJson)
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
    buscaPorId,
    edicao,
    login,
};

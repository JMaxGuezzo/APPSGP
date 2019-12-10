const Sequelize = require('sequelize');


// const sequelize = new Sequelize('dbsecretaria', 'root',  'Artprint15478*', {
//   dialect: 'mysql',
//   host: 'localhost',
//   host: 'localhost',
//   port: '3306',
//   define: {
//       timestamps: true,
//       freezeTableName: true,
//   }
// });

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
        timestamps: true,
        freezeTableName: true,
    }
});

const Estado = sequelize.define('estado', {
  id: {
      primaryKey: true,
      type: Sequelize.BIGINT,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING(500),
      allowNull: false,
      unique: 'compositeIndex',
    },
    sigla: {
      type: Sequelize.STRING(500),
      allowNull: false,
      unique: 'compositeIndex',
    },
  });

const TipoPessoa = sequelize.define('tipopessoa', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
    autoIncrement: true,
    },
  nome: {
    type: Sequelize.STRING(500),
    allowNull: false,
    unique: 'compositeIndex',
    },
});

const TipoAgendamento = sequelize.define('tipoagendamento', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
     autoIncrement: true,
    },
  nome: {
    type: Sequelize.STRING(500),
    allowNull: false,
    unique: 'compositeIndex',
    },
});

const TipoMovimento = sequelize.define('tipomovimento', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
    autoIncrement: true,
    },
  nome: {
    type: Sequelize.STRING(500),
    allowNull: false,
    unique: 'compositeIndex',
    },
});

const Ceb = sequelize.define('ceb', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
    autoIncrement: true,
    },
  nome: {
    type: Sequelize.STRING(500),
    allowNull: false,
    unique: 'compositeIndex',
    }
});

const Comunidade = sequelize.define('comunidade', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
    autoIncrement: true,
    },
  nome: {
    type: Sequelize.STRING(500),
    allowNull: false,
    unique: 'compositeIndex',
    },
  idceb: {
    type: Sequelize.INTEGER,
    references: { model: 'Ceb', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
    }
});

const Cidade = sequelize.define('cidade', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
    autoIncrement: true,
    },
  nome: {
    type: Sequelize.STRING(500),
    allowNull: false,
    unique: 'compositeIndex',
    },
  estadoId: {
    type: Sequelize.INTEGER,
    references: { model: 'Estado', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
    }
});

const LocalVisita = sequelize.define('localvisita', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
    autoIncrement: true,
    },
  nomelocal: {
    type: Sequelize.STRING(500),
    allowNull: false,
    },
  endereco: {
    type: Sequelize.STRING(500),
    allowNull: false,
    },
  numcasa : {
    type: Sequelize.STRING(500),
    allowNull: false,
    },
  bairro: {
    type: Sequelize.STRING(500),
    allowNull: false,
    },
  telefone: {
    type: Sequelize.STRING(500),
    allowNull: false, 
    },
  complemento: {
    type: Sequelize.STRING(500),
    },
  idcidade: {
    type: Sequelize.INTEGER,
    references: { model: 'Cidade', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
    }
});

const Pessoa = sequelize.define('pessoa', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
    autoIncrement: true,
    },
  nome: {
    type: Sequelize.STRING(500),
    allowNull: false,
    unique: 'compositeIndex',
    },
  datanasc: {
    type: Sequelize.DATE,
    allowNull: false,
    },
  endereco: {
    type: Sequelize.STRING(500),
    allowNull: false,
    },
  numcasa: {
    type: Sequelize.INTEGER,
    allowNull: false,
    },
  bairro: {
    type: Sequelize.STRING(500),
    allowNull: false,
    },
  telefone: {
    type: Sequelize.STRING(500),
    allowNull: false, 
    },
  complemento: {
    type: Sequelize.STRING(500),
    },
  rg: {
    type: Sequelize.STRING(500),
    unique: 'compositeIndex',
    },
  cpf: {
    type: Sequelize.STRING(500),
    unique: 'compositeIndex',
    },
  celular: {
    type: Sequelize.STRING(500),
    },
  situacao: {
    type: Sequelize.CHAR,
    },
  idcidade: {
    type: Sequelize.INTEGER,
    references: { model: 'Cidade', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
    },
  idtipopessoa: {
    type: Sequelize.INTEGER,
    references: { model: 'TipoPessoa', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
    },
  idcomunidade: {
    type: Sequelize.INTEGER,
    references: { model: 'Comunidade', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
    }
 });
              
const Agendamento = sequelize.define('agendamento', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
    autoIncrement: true,
    },
  idpessoa: {
    type: Sequelize.INTEGER,
    references: { model: 'Pessoa', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
    },
  idtipoagendamento: {
    type: Sequelize.INTEGER,
    references: { model: 'TipoAgendamento', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
    },
  idlocalvisita: {
    type: Sequelize.INTEGER,
    references: { model: 'LocalVisita', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
    },
  idsacerdote: {
    type: Sequelize.INTEGER,
    allowNull: false,
    },
    dataagenda: {
      type: Sequelize.DATE,
      allowNull: false,
      },
    hora: {
      type: Sequelize.STRING(500),
      allowNull: true,
        },
  descricao: {
    type: Sequelize.STRING(500),
    }
});

const ParcelasDizimo = sequelize.define('parcelasdizimo', {
  id: {
    primaryKey: true,
    type: Sequelize.BIGINT,
    autoIncrement: true,
    },
  idpessoa: {
    type: Sequelize.INTEGER,
    references: { model: 'pessoa', key: 'id' },
    onDelete: 'CASCADE',
    allowNull: false,
    },
    valor: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    datapgto: {
      type: Sequelize.DATE,
      allowNull: false,
      }
});

//Relacionamentos
Comunidade.belongsTo(Ceb, {
  foreignKey: 'idceb',
  as: 'comunidadeceb'
});

Cidade.belongsTo(Estado, {
  foreignKey: 'estadoId',
  as: 'cidadeestado'
});

LocalVisita.belongsTo(Cidade, {
  foreignKey: 'idcidade',
  as: 'visitacidade'
});

Pessoa.belongsTo(Cidade, {
  foreignKey: 'idcidade',
  as: 'pessoacidade'
});

Pessoa.belongsTo(TipoPessoa, {
  foreignKey: 'idtipopessoa',
  as: 'pessoatipo'
});

Pessoa.belongsTo(Comunidade, {
  foreignKey: 'idcomunidade',
  as: 'pessoacomunidade'
});

Agendamento.belongsTo(Pessoa, {
  foreignKey: 'idpessoa',
  as: 'agendapessoa'
});

Agendamento.belongsTo(LocalVisita, {
  foreignKey: 'idlocalvisita',
  as: 'agendalocal'
});

Agendamento.belongsTo(TipoAgendamento, {
  foreignKey: 'idtipoagendamento',
  as: 'agendatipo'
});

ParcelasDizimo.belongsTo(Pessoa, {
  foreignKey: 'idpessoa',
  as: 'pessoa',
});

module.exports = {
    sequelize,
    Comunidade,
    Ceb,
    Estado,
    Cidade,
    TipoPessoa,
    TipoAgendamento,
    TipoMovimento,
    LocalVisita,
    Pessoa,
    Agendamento,
    ParcelasDizimo
};

const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './database.sqlite',
    define: {
        timestamps: true,
        freezeTableName: true,
    }
});

const Fiel = sequelize.define('fiel', {
    id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },     
});

const Tarefa = sequelize.define('tarefa', {
    id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
      },
      titulo: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      concluido: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      
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
            }
          });
const Civil = sequelize.define('civil', {
            id: {
                primaryKey: true,
                type: Sequelize.BIGINT,
                autoIncrement: true,
              },
              nome: {
                type: Sequelize.STRING(500),
                allowNull: false,
              },
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
                },
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
                  },
                });

Comunidade.hasMany(Ceb);
Ceb.belongsTo(Comunidade);

module.exports = {
    sequelize,
    Fiel,
    Tarefa,
    Comunidade,
    Ceb,
    Civil,
    Estado,
    Cidade
};

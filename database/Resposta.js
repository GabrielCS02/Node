const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("tb_respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({foce:false});

module.exports = Resposta;
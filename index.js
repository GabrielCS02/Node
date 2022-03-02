const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");

//Database
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

//Explicando ao express para usar o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get("/", (require, response)=>{
   
    response.render("index.ejs");
});

app.get("/perguntas",(require, response)=>{
    response.render("perguntas");
})

app.post("/salvarpergunta",(require, response)=>{
    var titulo = require.body.titulo;
    var descricao = require.body.descricao;
    response.send("Formulário encaminhado! Título: " + titulo + "" + ", Descrição: " + descricao)
});

app.listen(4002,()=>{
    console.log("App funcionando!");
});
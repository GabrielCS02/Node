const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
    Pergunta.findAll({raw: true, order:[
        ['id','DESC'] // ASC = Crescente || DESC = Descrescente
    ]}).then(perguntas =>{
        response.render("index.ejs",{
            perguntas: perguntas
        });
    })
    
});

app.get("/perguntas",(require, response)=>{
    response.render("perguntas");
})

app.post("/salvarpergunta",(require, response)=>{
    var titulo = require.body.titulo;
    var descricao = require.body.descricao;
    
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => { 
        response.redirect("/");
    });
    
});

app.get("/pergunta/:id",(request,response)=>{
    var id = request.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada
            response.render("pergunta",{
                pergunta: pergunta
            });
        }else{ // Não encontrada
            response.redirect("/");
        }
    });
});

app.listen(4002,()=>{
    console.log("App funcionando!");
});
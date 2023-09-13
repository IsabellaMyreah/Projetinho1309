const express  = require("express");
const app = express();
const mysql = require("mysql2")
const handlebars = require("express-handlebars");
const { request, response } = require("express");
const port = 3000
const Post = require("./models/Post")

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.engine("handlebars", handlebars.engine());
app.set('view engine', 'handlebars'); 

app.get("/cadastrar", (request, response) => {
    response.render('formulario')

})

app.post("/cadastrar", (request, response) => {
    Post.create({
        nome: request.body.nome,
        preco: request.body.preco,
        descricao: request.body.descricao
    }).then(() => {
        response.send("Produto inserido com sucesso!🌟")
    }).catch((error)=>{
        response.send("Houve um erro ao inserir dados😒" + error)
    })
});

app.listen(port, (error) => {
    if(error) {
        console.error("Erro ao acessar a porta😭" + error)
        return
    }

    console.log("Servidor rodando na porta " + port, "!🥳")
});

app.get("/", (request, response) => {
    Post.findAll().then((produtos) => {
        response.render('home', {tb_produtos: produtos})
    })
})
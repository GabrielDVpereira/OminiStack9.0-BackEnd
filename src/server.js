const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://oministack:gabriel299@cluster0-ldd1j.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})



//Req: Recebe as informações de usuários da requisição
//Res: manda informações para o clienta

//req.query acessa os query params(valores passados para o servidor através da rota, para filtros)
//req.params = acessar route params(para edição, delete)
//req.body = acessar corpo de uma requisição post

//Indicamos ao express que requisições posts serão realizadas por metodo post
app.use(express.json());
app.use(routes);

app.listen(3333);
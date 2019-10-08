const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const path = require('path');

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
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); //Forma como o express retorna arquivos estáticos
app.use(routes);

app.listen(process.env.PORT || 3333);

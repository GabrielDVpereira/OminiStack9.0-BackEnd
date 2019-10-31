const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

const socketio = require('socket.io');
const http = require('http');
const path = require('path');


const app = express();
const server = http.Server(app); // Servidor http extraido dentro do express
const io = socketio(server); //consegue ouvir o processo web socket


mongoose.connect('mongodb+srv://oministack:gabriel299@cluster0-ldd1j.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})



const connectedUsers = {}; //não recomendado guardar usuários em variáveis, pois ira se perder com se a aplicação reiniciar
//recomendação: redis

//ouve de todos os usuário logados na aplicação
io.on('connection', socket => { //socket representa a conexão com o usuário
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id; // relacionando o id de usuário com sua conexão com o socket
    console.log(connectedUsers)
});


app.use((req, res, next) => {
    req.io = io //passando o io para todas as rotas usando middlewares, todas as rotas tem acesso ao req
    req.connectedUsers = connectedUsers;

    return next();
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

server.listen(process.env.PORT || 3333); // Agr escuta tanto requisições http quanto requisições web socket

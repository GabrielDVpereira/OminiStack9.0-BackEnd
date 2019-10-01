const mongoose = require('mongoose');

//Descrição de quais campos a tabela de usuários irá conter
const UserSchema = new mongoose.Schema({
    email: String
});

module.exports = mongoose.model('User', UserSchema);
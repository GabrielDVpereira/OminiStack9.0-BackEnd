const mongoose = require('mongoose');

//Descrição de quais campos a tabela de usuários irá conter
const BookingSchema = new mongoose.Schema({
    date: String,
    aproved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },  
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }   
});

module.exports = mongoose.model('Booking', BookingSchema);
const mongoose = require('mongoose');

//Descrição de quais campos a tabela de usuários irá conter
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
  toJSON: {
    virtuals: true,
  },
});

SpotSchema.virtual('thumbnail_url').get(function() {
  const url = process.env.URL || 'http://localhost:3333'
  return `${url}/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);

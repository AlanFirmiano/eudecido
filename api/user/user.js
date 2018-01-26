const restful = require('node-restful');
const mongoose = restful.mongoose;

const userSchema = new mongoose.Schema({
    login: {type: String, required: true},
    senha: {type: String, required: true},
    nome: {type: String, required: true}
});

module.exports = restful.model('User', userSchema);

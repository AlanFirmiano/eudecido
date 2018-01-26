const restful = require('node-restful');
const mongoose = restful.mongoose;

const comentarioSchema = new mongoose.Schema({
    texto: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    data: {type: Date, default: Date.now, required: true}
});

const obraSchema = new mongoose.Schema({
    id_obra: String,
    descricao: String,
    status: String,
    empresa: String,
    municipio: String,
    percentual_executado: {type: Number, required: true},
    dataInicio: {type: Date, default: Date.now, required: false},
    dataFim: {type: Date, default: Date.now, required: false},
    valor: {type: Number, required: true},
    comentarios: [comentarioSchema],
    bom: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    ruim: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = restful.model('Obra', obraSchema);
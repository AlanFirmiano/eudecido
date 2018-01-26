const Obra = require('./obra');

Obra.methods(['get', 'post', 'put', 'delete']);
Obra.updateOptions({new: true, runValidators: true});
module.exports = Obra;
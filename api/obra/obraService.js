const Obra = require('./obra');
Obra.route('bom.get', (req, res, next) => {
    Obra.aggregate(
        [
            { "$project": {
                "id_obra": 1,
                "descricao": 1,
                "bom": 1,
                "ruim": 1,
                "status": 1,
                "length": { "$size": "$bom" }
            }},
            { "$sort": { "length": -1 } },
            { "$limit": 10 }
        ],
        (err,results) => {
            if(!err){
                res.send(results)
                return;
            }
            res.status(404).send("erro")
        }
    )
 });
 Obra.route('ruim.get', (req, res, next) => {
    Obra.aggregate(
        [
            { "$project": {
                "id_obra": 1,
                "descricao": 1,
                "bom": 1,
                "ruim": 1,
                "status": 1,
                "length": { "$size": "$ruim" }
            }},
            { "$sort": { "length": -1 } },
            { "$limit": 10 }
        ],
        (err,results) => {
            if(!err){
                res.send(results)
                return;
            }
            res.status(404).send("erro")
        }
    )
 });
Obra.methods(['get', 'post', 'put', 'delete']);

Obra.updateOptions({new: true, runValidators: true});
module.exports = Obra;
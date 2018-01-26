const port = 3003;

const bodyParser = require('body-parser');
const express = require('express');
const allowCors = require('./cors')
const server = express();

server.use(bodyParser.urlencoded({ extended : true }));
server.use(bodyParser.json());
server.use(allowCors);


const Obra = require('../api/obra/obra');
server.listen(port, () => {

    Obra.find(function(err, docs) {
        if (!err){ 
            if(docs.length == 0){
                const fs = require('fs')
                const csv = require("fast-csv")
                const stream = fs.createReadStream("Obras.csv")
                csv
                .fromStream(stream, {headers : true})
                    .on("data", function(data){
                        let ob = new Obra()
                        ob.id_obra = data.id_obra
                        ob.descricao = data.descricao
                        ob.status = data.status
                        ob.empresa = data.contratada
                        ob.municipio = data.municipio
                        ob.percentual_executado = data.percentual_executado
                        ob.dataInicio = data.data_inicio
                        ob.dataFim = data.data_fim_previsto
                        ob.valor = data.valor
                        ob.save((err) => {
                            
                        })
                    })
                    .on("end", function(){
                        console.log("dados importados!");
                    })
            }
        } else {throw err;}
    });
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = server;

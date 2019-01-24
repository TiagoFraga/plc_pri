var http = require('http')
var url = require('url')
var fs = require('fs')
var mongoose = require('mongoose')
var Obra = require('./obra')
var jsonfile = require('jsonfile')


// Base de Dados (Falta editar conexão)

mongoose
  .connect('mongodb://127.0.0.1:27017/iBanda', {useNewUrlParser: true})
  .then(() => console.log('Mongo status: ' + mongoose.connection.readyState))
  .catch(() => console.log('Mongo: erro na conexão.'))

// Expressões regulares
var index = /index/

http.createServer((req,res)=>{
    var purl = url.parse(req.url,true)
   
    if(index.test(purl.pathname)){
        fs.readdir('obras-musicais-json/json/',(erro,ficheiros) =>{
            if(!erro){
                for(var i in ficheiros){
                    var file = 'obras-musicais-json/json/' + ficheiros[i]
                    jsonfile.readFile(file,(err,dados) =>{
                        if(!err){
                            var obra = new Obra({
                                _id: dados._id,
                                titulo: dados.titulo,
                                tipo: dados.tipo,
                                compositor: dados.compositor,
                                arranjo: dados.arranjo,
                                instrumentos: dados.instrumentos
                            })    
                                
                                Obra.create(obra)
                        }
                        else{
                            console.log('Erro no Ficheiro: ' + i  + ' -> ' + err)
                        }
                    })
                }
            }
            else{
                console.log('Erro ao ler a directoria')
            }
        })
        res.end()
    }   
}).listen(6002,()=>{
    console.log('Servidor á escuta na porta 6001...')
})
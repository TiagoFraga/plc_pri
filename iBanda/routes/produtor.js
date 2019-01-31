var express = require('express')
var router = express.Router()
var axios = require('axios')
var passport = require('passport')
var zip = require('express-easy-zip')
var unzip = require('unzip')
var extract = require('extract-zip')
var fs = require('fs')
var fsExtra = require('fs-extra')
var JSZip = require("jszip");
var formidable = require('formidable')
var jsonfile = require('jsonfile')
router.use(zip());

const StreamZip = require('node-stream-zip');
var myBD = __dirname + "/../public/data/ficheiros.json"
console.log('BD in: ' + __dirname + '/../public/data')



router.get('/',passport.authenticate('isProdutor',{session:false}),(req, res) => {
    res.render('produtor')
})

// ******************************* Obras ***************************************

router.get('/obras/listar',passport.authenticate('isProdutor',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/produtor/obras/listar')
        .then(dados => {res.render('listarObras_Produtor',{obras: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.get('/obras/listar/obra/:obra',passport.authenticate('isProdutor',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/produtor/obras/listar/obra/' + req.params.obra)
        .then(dados => {res.render('listarObra_Produtor',{obra: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.get('/obras/listar/tipo',passport.authenticate('isProdutor',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/produtor/obras/listar/tipo/' + req.query.tipo)
        .then(dados => {res.render('listarObras_Produtor',{obras: dados.data})})
        .catch(erro => {
            console.log('Erro na listagem do Utilizador: ' + erro)
            res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
    })
})

router.get('/obras/inserir',passport.authenticate('isProdutor',{session:false}),(req, res) => {
    res.render('inserirObra_Produtor')
})

router.post('/obras/remover',passport.authenticate('isProdutor',{session:false}),(req, res) => {
    axios.post('http://localhost:9009/api/produtor/obras/remover', req.body)
        .then(()=> res.redirect('http://localhost:9009/produtor/obras/listar'))
        .catch(erro => {
            console.log('Erro na inserção da Notícia: ' + erro)
            res.render('error', {error: erro, message: "Erro na inserção da Notícia"})
    })
})


router.post('/obras/inserir',passport.authenticate('isProdutor',{session:false}),(req, res) => {
    var form = new formidable.IncomingForm()
    form.parse(req,(erro,fields,files)=>{
      var fenviado = files.ficheiro.path
      var fnovo = './public/uploadedZIP/'+files.ficheiro.name
      fs.rename(fenviado,fnovo,(erro)=>{
          if(!erro){
              jsonfile.readFile(myBD,(erro, ficheiros)=>{
                  if(!erro){
                      ficheiros.push({nome:files.ficheiro.name,link:fnovo,status: "Ficheiro recebido e guardado com sucesso."})
                      jsonfile.writeFile(myBD, ficheiros, erro =>{
                          if(erro){
                              res.render('erro.pug',{e:"Ocorreram erros na gravação do ficheiro enviado: "+erro})
                          }else{
                              jsonfile.readFile(myBD, (erro, ficheiros)=>{
                                  if(!erro){
                                      fs.readFile(fnovo, function(err, data) {
                                        if (err) throw err;
                                        JSZip.loadAsync(data).then(function (zip) {
                                          files = Object.keys(zip.files);
                                          var manifesto = files[0] + 'iBanda-SIP.json'
                                          var suc = false
                                          for(var i in files){
                                            if(files[i] == manifesto){
                                              suc = true
                                            }
                                          }
                                          if(suc == true){
                                            //so consegui resolver isto com um caminho absoluto ... IMPORTANTE RESOLVER !!!
                                            extract(fnovo, {dir: '/Users/tiagofraga/Desktop/PLC/PRI/Trabalhos/Local/TP/iBanda/public/catalogo/'}, function (erro) {
                                              if(!erro){
                                                jsonfile.readFile('./public/catalogo/'+ files[0] + 'iBanda-SIP.json',(erro,file)=>{
                                                    if(!erro){
                                                    fs.readdir('./public/catalogo/' + files[0],(erro,data) => {
                                                      if(!erro){
                                                        var count = 0
                                                        for(d in data){
                                                          var pasta = isDir('./public/catalogo/' + files[0] + '/' + data[d])
                                                          if(pasta == true){
                                                            count++
                                                            var abrir = data[d]
                                                          }
                                                        }
                                                        if(count == 1){
                                                            fs.readdir('./public/catalogo/' + files[0] + abrir,(erro,dir)=>{
                                                              if(!erro){
                                                                //Definir aqui todas as formas de validação do zip 
                                                                var valida = manifesto_obras(file,dir)
                                                                if(valida){
                                                                    //guardar na base de dados e renomear a pasta
                                                                    var dirNameAntigo = './public/catalogo/' + files[0] 
                                                                    var dirNameNovo = './public/catalogo/' + file._id
                                                                    fs.rename(dirNameAntigo,dirNameNovo,(erro)=>{
                                                                        if(!erro){
                                                                            axios.post('http://localhost:9009/api/produtor/obras/inserir', file)
                                                                                .then(dados => {res.render('listarObra_Produtor',{obra: dados.data})})
                                                                                .catch(erro => {
                                                                                    console.log('Erro na listagem do Utilizador: ' + erro)
                                                                                    res.render('error', {error: erro, message: "Erro na listagem de Utilizadores"})
                                                                            })

                                                                        }else{
                                                                            console.log("Deu Merda")
                                                                            axios.post('http://localhost:9009/api/produtor/obras/inserir', file)
                                                                                .then(dados => {res.render('listarObra_Produtor',{obra: dados.data})})
                                                                                .catch(erro => {
                                                                                    fsExtra.remove('./public/catalogo/' + files[0], (erro)=>{
                                                                                        res.render('inserirObraErro_Produtor')
                                                                                    });
                                                                            })
                                                                        }
                                                                    })  
                                                                }else{
                                                                    //apagar a pasta
                                                                    fsExtra.remove('./public/catalogo/' + files[0], (erro)=>{
                                                                        res.render('inserirObraErro_Produtor')
                                                                    });
                                                                }
                                                              }else{
                                                                res.render('inserirObraErro_Produtor')
                                                              }
                                                            })
                                                        }else{
                                                          res.render('inserirObraErro_Produtor')
                                                        }
                                                      }
                                                      else{
                                                        res.render('inserirObraErro_Produtor')
                                                      }
                                                    })
                                                  }else{
                                                    res.render('inserirObraErro_Produtor')
                                                  }
                                                })
                                                
                                              }else{
                                                res.render('inserirObraErro_Produtor')
                                              }
                                            })
                                          }else{
                                            res.render('inserirObraErro_Produtor')
                                          }
                                        });
                                    }) 
                                  }
                                  else{
                                    res.render('inserirObraErro_Produtor')
                                  }
                              })
                          }
                      })
                  }
              })
          }else{
            res.render('inserirObraErro_Produtor')
          }
      })
  })
})

function isDir(path) {
    try {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        return false;
    }
}

function manifesto_obras(manifesto, pasta){
    for(m in manifesto.instrumentos){
        var suc = false
        for(p in pasta){
            if(manifesto.instrumentos[m].partitura.path === pasta[p]){
                suc = true
            }
        }
        if(suc == false){
            return false
        }
    }

    return true
}


// ******************************* Eventos ***************************************

router.get('/eventos/listar',passport.authenticate('isProdutor',{session:false}),(req, res) => {
    axios.get('http://localhost:9009/api/produtor/eventos/listar')
         .then(dados => {
            res.render('listarEventos_Produtor',{eventos: dados.data})})
         .catch(erro => {
                console.log('Erro na listagem de Eventos: ' + erro)
                res.render('error', {error: erro, message: "Erro na listagem de Eventos"})
         })
    
})



module.exports = router;

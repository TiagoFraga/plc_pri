var Noticia = require('../models/noticia')
const Noticias = module.exports


// Função para listar todas as notícias
Noticias.listar = () => {
    return Noticia
        .find()
        .exec()
}

// Função para adicionar uma notícia a base de dados
Noticias.adiciona = async n =>{
    await Noticia.count({},(erro,count) =>{
        if(!erro){
            var id = count +1
            var noticia = new Noticia({
                _id: id,
                titulo: n.titulo,
                corpo: n.corpo,
                visibilidade: true,
            })

            return Noticia.create(noticia)
        }
        else{
            console.log('Erro: ' + erro )
        }
    })
}

// Função para atualizar uma notícia
Noticias.atualiza = n =>{
    
    var noticia = new Noticia({
        _id: n.id,
        titulo: n.titulo,
        corpo: n.corpo,
        visibilidade: true,
    })
    
    return Noticia.findByIdAndUpdate(n.id,noticia,{new: true},(erro,doc)=>{
        if(!erro){
        }
        else{
            console.log('Não consegui atualizar utilizador')
        }
        
    })
}

Noticias.remove = id =>{
    return Noticia.findByIdAndRemove(id,(erro,doc) =>{
        if(!erro){
            console.log('Utilizador removido com sucesso')
        }
        else{
            console.log('Não consegui remover utilizador')
        }
        
    })
}

// Função para alterar a visibilidade de uma notícia
Noticias.alteraVisibilidade = async id =>{
    var not = await Noticia.findOne({_id: id})
    if(not.visibilidade){
        var noticia = new Noticia({
            _id: not._id,
            titulo: not.titulo,
            corpo: not.corpo,
            visibilidade: false,
        })
    }
    else{
        var noticia = new Noticia({
            _id: not._id,
            titulo: not.titulo,
            corpo: not.corpo,
            visibilidade: true,
        })
    }

    return Noticia.findByIdAndUpdate(noticia._id,noticia,{new: true},(erro,doc)=>{
        if(!erro){
        }
        else{
            console.log('Não consegui atualizar utilizador')
        }
        
    })

}
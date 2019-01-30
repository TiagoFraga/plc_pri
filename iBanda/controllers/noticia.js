var Noticia = require('../models/noticia')
const Noticias = module.exports


// Função para listar todas as notícias
Noticias.listar = () => {
    return Noticia
        .find()
        .exec()
}

Noticias.obter = id =>{
    return Noticia
           .findOne({_id:id})
           .exec()
}

// Função para adicionar uma notícia a base de dados
Noticias.adicionar = async n =>{
    await Noticia.count({},(erro,count) =>{
        if(!erro){
            var id = count +1
            var noticia = new Noticia({
                _id: id,
                titulo: n.titulo,
                corpo: n.corpo,
                data: n.data,
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
    return Noticia.findOneAndUpdate({_id:n.id},{$set:{titulo:n.titulo,corpo: n.corpo, data: n.data,visibilidade:true}},{new: true},(erro,doc)=>{
        if(!erro){
        }
        else{
            console.log('Não consegui atualizar utilizador')
        }
        
    })
}

Noticias.remove = id =>{
    return Noticia.findOneAndRemove({_id: id},(erro,doc) =>{
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
        return Noticia.findOneAndUpdate({_id:id},{$set:{visibilidade:false}},{new: true},(erro,doc)=>{
            if(!erro){
            }
            else{
                console.log('Não consegui atualizar visibilidade da notícia')
            }
        })
    }
    else{
        return Noticia.findOneAndUpdate({_id:id},{$set:{visibilidade:true}},{new: true},(erro,doc)=>{
            if(!erro){
            }
            else{
                console.log('Não consegui atualizar visibilidade da notícia')
            }
        })
    }

}

Noticias.listarVisiveis = () =>{
    return Noticia
        .find({visibilidade: true})
        .sort({data: -1})
        .exec()
}


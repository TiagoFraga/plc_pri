var Obra = require('../models/obra')
const Obras = module.exports



Obras.listar = () =>{
    return Obra
        .find()
        .exec()
}

Obras.consultar = id =>{
    return Obra
        .findOne({_id: id})
        .exec()
}

Obras.listarTipo = tipo =>{
    return Obra
        .find({tipo: tipo})
        .exec()
}

Obras.atualiza = o =>{
    if(o.arranjo){
        if(o.instrumentos){
            var obra = new Obra({
                 _id: o._id,
                titulo: o.titulo,
                tipo: o.tipo,
                compositor: o.compositor,
                arranjo: o.arranjo,
                instrumentos : o.instrumentos
            })
        }
        else{
            var obra = new Obra({
                _id: o._id,
                titulo: o.titulo,
                tipo: o.tipo,
                compositor: o.compositor,
                arranjo: o.arranjo
            })
        }
    }
    else{
        if(o.instrumentos){
            var obra = new Obra({
                _id: o._id,
               titulo: o.titulo,
               tipo: o.tipo,
               compositor: o.compositor,
               arranjo: o.arranjo,
               instrumentos : o.instrumentos
           })
        }
        else{
            var obra = new Obra({
                _id: o._id,
                titulo: o.titulo,
                tipo: o.tipo,
                compositor: o.compositor,
                arranjo: o.arranjo
            })
        }
    }
    
    Obra.findByIdAndUpdate(o._id,obra,{new: true},(erro,doc)=>{
        if(!erro){
            console.log('Utilizador atualizado com sucesso')
        }
        else{
            console.log('Não consegui atualizar utilizador')
        }
        return doc 
    })
}

Obras.remove = id =>{
    Obra.findByIdAndRemove(id,(erro,doc) =>{
        if(!erro){
            console.log('Utilizador removido com sucesso')
        }
        else{
            console.log('Não consegui remover utilizador')
        }
        return doc
    })
}
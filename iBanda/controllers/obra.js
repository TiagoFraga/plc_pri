var Obra = require('../models/obra')
const Obras = module.exports


// Função para listar todas as obras
Obras.listar = () =>{
    return Obra
        .find()
        .exec()
}

// Função para listar uma dada obra
Obras.consultar = id =>{
    return Obra
        .findOne({_id: id})
        .exec()
}
// Função para listar todas as obras por tipo
Obras.listarTipo = t =>{
    var tipo = new RegExp(t, "i")
    return Obra
        .find({tipo: tipo})
        .exec()
}

// Função para inserir uma obra (Falta Testar)
Obras.insere = o =>{
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

    return Obra.create(obra)
}

// Função para atualizar uma dada obra (Falta Testar)
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

// Função para remover uma dada obra (Falta Testar)
Obras.remove = id =>{
    return Obra.findOneAndRemove({_id: id},(erro,doc) =>{
        if(!erro){
            console.log('Utilizador removido com sucesso')
        }
        else{
            console.log('Não consegui remover utilizador')
        }
    })
}
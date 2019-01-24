var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PartituraSchema = new Schema (
    {
        path: {type: String},
        voz: {type: String},
        clave: {type: String},
        afinacao: {type: String}
    },{
        _id: false
    }
)


var InstrumentoSchema = new Schema (
    {
        nome: {type: String},
        partitura: {type: PartituraSchema}
    },{
        _id: false
    }
)

var ObraSchema = new Schema (
    {
        _id: {type: String, required: true},
        titulo: {type: String, required: true},
        tipo: {type: String, required: true},
        compositor: {type: String, required: true},
        arranjo: {type: String},
        instrumentos: [InstrumentoSchema]
    }
)

module.exports = mongoose.model('Obra',ObraSchema,'obras')
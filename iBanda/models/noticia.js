var mongoose = require('mongoose')
var Schema = mongoose.Schema


var NoticiaSchema = new Schema (
    {
        _id: {type: Number,required: true},
        titulo: {type: String, required: true},
        corpo: {type: String, required: true},
        data: {type: String, required: true },
        visibilidade: {type: Boolean, required: true}
    }
)


module.exports = mongoose.model('Noticia',NoticiaSchema,'noticias')
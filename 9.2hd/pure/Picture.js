
var mongoose = require('./db')



var picture = new mongoose.Schema
    (
        {
            
            type:
            {
                type:Object,
                default:'null'
            }
        }
        
    )





var picture = mongoose.model('Picture', picture)
module.exports = picture;
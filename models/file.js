const {Schema, model} = require('mongoose')
const file = new Schema({
    name: {
        type: String,
        required: true
    },
})

module.exports = model('File', file)
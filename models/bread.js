// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose 

// schema
const breadSchema = new Schema({
    name: { type: String, required: true },
    hasGluten: Boolean,
    image: { type: String, default: 'https://i.redd.it/vrr3lmx8fek71.jpg' },
    baker: {
        type: Schema.Types.ObjectId,
        ref: 'Baker'
    }
})

// model and export 
const Bread = mongoose.model('Bread', breadSchema)
module.exports = Bread

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    nom:{type:String,require:true},
    prenom:{type:String,require:true},
    entreprise:{type:String},
    telephone:{type:String,require:true},
    mobile:{type:String},
    email:{type:String},
    adresse:{type:String}

},{timestamps:true});

const Contact = mongoose.model("contacts",contactSchema)
module.exports = Contact ;

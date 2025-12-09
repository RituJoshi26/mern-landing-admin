const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ContactSchema = new Schema({
fullName: String,
email: String,
mobile: String,
city: String,
message :String
}, { timestamps: true });


module.exports = mongoose.model('Contact', ContactSchema);
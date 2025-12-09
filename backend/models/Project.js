const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProjectSchema = new Schema({
name: { type: String, required: true },
description: { type: String, required: true },
imageUrl: { type: String }
}, { timestamps: true });


module.exports = mongoose.model('Project', ProjectSchema);
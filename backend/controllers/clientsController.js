const Client = require('../models/Client');


exports.getAll = async (req, res) => {
const clients = await Client.find().sort({ createdAt: -1 });
res.json(clients);
};


exports.create = async (req, res) => {
const { name, designation, description } = req.body;
const imageUrl = req.file && req.file.savedPath ? req.file.savedPath : null;
const client = new Client({ name, designation, description, imageUrl });
await client.save();
res.json(client);
};


exports.delete = async (req, res) => {
await Client.findByIdAndDelete(req.params.id);
res.json({ success: true });
};
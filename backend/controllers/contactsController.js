const Contact = require('../models/Contact');


exports.create = async (req, res) => {
const { fullName, email, mobile, city,message  } = req.body;
const contact = new Contact({ fullName, email, mobile, city,message  });
await contact.save();
res.json(contact);
};


exports.getAll = async (req, res) => {
const contacts = await Contact.find().sort({ createdAt: -1 });
res.json(contacts);
};

exports.remove = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

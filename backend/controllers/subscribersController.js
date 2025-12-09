const Subscriber = require('../models/Subscriber');


exports.create = async (req, res) => {
const { email } = req.body;
if (!email) return res.status(400).json({ error: 'Email required' });
const exists = await Subscriber.findOne({ email });
if (exists) return res.status(400).json({ error: 'Already subscribed' });
const sub = new Subscriber({ email });
await sub.save();
res.json(sub);
};


exports.getAll = async (req, res) => {
const subs = await Subscriber.find().sort({ createdAt: -1 });
res.json(subs);
};

exports.remove = async (req, res) => {
  await Subscriber.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

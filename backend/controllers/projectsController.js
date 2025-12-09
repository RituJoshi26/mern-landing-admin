const Project = require('../models/Project');


exports.getAll = async (req, res) => {
const projects = await Project.find().sort({ createdAt: -1 });
res.json(projects);
};


exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;

    const imageUrl = req.file?.savedPath || null;

    const project = new Project({
      name,
      description,
      imageUrl,
    });

    await project.save();
    res.json(project);
  } catch (err) {
    console.error("Project save failed:", err);
    res.status(500).json({ error: "Project creation failed" });
  }
};



exports.delete = async (req, res) => {
await Project.findByIdAndDelete(req.params.id);
res.json({ success: true });
};
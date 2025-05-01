const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const projectCount = await Project.countDocuments({ user: req.user.id });
    if (projectCount >= 4) {
      return res.status(403).json({ message: "You can only create up to 4 projects." });
    }

    const project = await Project.create({
      user: req.user.id,
      title: req.body.title
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Category = require('../models/Category');

// @desc Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Create new category
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: 'Category exists' });

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

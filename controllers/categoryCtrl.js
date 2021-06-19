const Category = require("../models/categoryModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  createCategory: async (req, res) => {
    try {
      // if user have role 1 ---> admin
      // only admin create, delete, update category
      const { name } = req.body;

      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "This category already exists." });

      const newCategory = new Category({
        name: name,
      });

      await newCategory.save();

      return res.json({ msg: "Success" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      return res.json({ msg: "Deleted a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });

      res.json({ msg: "Updated Category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;

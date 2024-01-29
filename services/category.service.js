const boom = require("@hapi/boom");
const { categoryModel } = require("../db/models");

class CategoryService {
  async create(data) {
    try {
      const newCategory = new categoryModel({
        ...data,
      });
      const save = await newCategory.save();
      return save;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const categories = await categoryModel.find();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id) {
    try {
      const category = await categoryModel.findById(id);

      if (!category) {
        throw boom.notFound("Category not found");
      }

      return category;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const updatedCategory = await categoryModel.updateOne({ _id: id }, data);
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletedCategory = await categoryModel.deleteOne({ _id: id });
      return { id };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoryService;

const boom = require("@hapi/boom");
const cloudinary = require("cloudinary").v2;
const fs = require("fs-extra");
const { categoryModel } = require("../db/models");
const mongoose = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CategoryService {
  async create(req) {
    try {
      const { body, file } = req;

      let category = {
        name: body.name,
        imageUrl: body.imageUrl,
        imageId: "null",
      };

      if (file) {
        const result = await cloudinary.uploader.upload(file.path);

        category.imageId = result.public_id;
        category.imageUrl = result.secure_url;

        // deleted the now unused file in the server;
        await fs.unlink(file.path);
      }

      const newCategory = new categoryModel(category);
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
      const objectId = new mongoose.Types.ObjectId(id);

      const category = await categoryModel.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "categoryId",
            as: "products",
          },
        },
        { $match: { _id: objectId } },
      ]);

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

const boom = require("@hapi/boom");
const cloudinary = require("cloudinary").v2;
const fs = require("fs-extra");
const { productModel } = require("../db/models");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class ProductsService {
  async create(req) {
    try {
      const { body, file } = req;

      let product = {
        name: body.name,
        brand: body.brand,
        imageUrl: body.imageUrl,
        imageId: "null",
        price: body.price,
        stock: body.stock,
        description: body.description,
        category: body.category,
      };

      if (file) {
        const result = await cloudinary.uploader.upload(file.path);

        product.imageUrl = result.secure_url;
        product.imageId = result.public_id;

        // deleted the now unused file in the server;
        await fs.unlink(file.path);
      }

      const newProduct = new productModel(product);

      const save = await newProduct.save();

      return save;
    } catch (error) {
      throw error;
    }
  }

  async find(query) {
    const { limit, offset } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id) {
    try {
      const product = await productModel.findById(id);

      if (!product) {
        throw boom.notFound("Product no found");
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(id, req) {
    const { body, file } = req;

    try {
      if (file) {
        await cloudinary.uploader.destroy(body.imageId);

        const result = await cloudinary.uploader.upload(file.path);
        await fs.unlink(file.path);

        const changes = {
          ...body,
          image: result.secure_url,
          imageId: result.public_id,
        };

        await productModel.updateOne({ _id: id }, changes);
        return { id };
      } else {
        await productModel.updateOne({ _id: id }, body);
        return { id };
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const product = await productModel.deleteOne({ _id: id });
      return product;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductsService;

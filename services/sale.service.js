const boom = require("@hapi/boom");
const { saleModel } = require("../db/models");

class SaleService {
  async create(body) {
    try {
      const newSale = new saleModel({
        ...body,
      });
      const save = await newSale.save();
      return save;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
        const sales = await saleModel.find();
        return sales;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id) {
    try {
        const sale = await saleModel.findById(id);
        return sale;
    } catch (error) {
      throw error;
    }
  }

  async update(id, body) {
    try {
        const updatedSale = await saleModel.updateOne({_id: id}, body);
        return updatedSale;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
        const deletedSale = await saleModel.deleteOne({_id: id});
        return {id};
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SaleService;

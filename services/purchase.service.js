const boom = require("@hapi/boom");
const { purchaseModel } = require("../db/models");

class PurchaseService {
  async create(body) {
    try {
      const newPurchase = new purchaseModel(body);
      const save = await newPurchase.save();
      return save;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const purchases = await purchaseModel.find();
      return purchases;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id) {
    try {
      const purchase = purchaseModel.findById(id);
      return purchase;
    } catch (error) {
      throw error;
    }
  }

  async update(id, body) {
    try {
      const updatedPurchase = purchaseModel.updateOne({ _id: id }, body);
      return updatedPurchase;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deleted = await purchaseModel.deleteOne({ _id: id });
      return { id };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PurchaseService;

const boom = require("@hapi/boom");
const { adressesModel } = require("../db/models");

class AdressesService {
  async create(body) {
    try {
      const newAdress = new adressesModel(body);
      const save = await newAdress.save();
      return save;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id) {
    try {
      const adress = await adressesModel.findById(id);
      return adress;
    } catch (error) {
      throw error;
    }
  }

  async update(id, body) {
    try {
      const update = await adressesModel.updateOne({ _id: id }, body);
      return update;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      await adressesModel.deleteOne({ _id: id });
      return { id };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdressesService;

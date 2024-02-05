const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const { userModel } = require("../db/models");
const { default: mongoose } = require("mongoose");

class UserService {
  async findAll() {
    try {
      const users = await userModel
        .find()
        .select({
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
        })
        .exec();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const userId = new mongoose.Types.ObjectId(id);
      const user = await userModel.aggregate([
        { $match: { _id: userId } },
        {
          $lookup: {
            from: "adresses",
            foreignField: "userId",
            localField: "_id",
            as: "adresses",
          },
        },
      ]);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const user = await userModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      const hash = await bcrypt.hash(data.password, 10);
      data.password = hash;
      const newUser = new userModel({
        ...data,
      });
      const save = await newUser.save();
      return save;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const updatedUser = await userModel.updateOne({ _id: id }, data);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletedUser = await userModel.deleteOne({ _id: id });
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;

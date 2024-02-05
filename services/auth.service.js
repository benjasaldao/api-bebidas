const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { config } = require("./../config/config");
const UserService = require("./user.service");
const userService = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email, url) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user._id };
    const token = jwt.sign(payload, config.recoveryJwtSecret, {
      expiresIn: "15min",
    });
    const link = `${url}/${token}`;
    await userService.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.recoveryJwtSecret);
      const user = await userService.findById(payload.sub);
      if (user[0].recoveryToken != token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await userService.update(user[0]._id, {
        recoveryToken: null,
        password: hash,
      });
      return { message: "password changed" };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: "mail sent" };
  }
}

module.exports = AuthService;

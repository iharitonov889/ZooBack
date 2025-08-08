const { users } = require("../db");
const bcrypt = require("bcrypt");
const { requestResetPassword } = require("../mailer.js");

const { parserForEmail } = require("../db/redis");

class userController {
  async registration(req, res) {
    const { name, email, password, phone } = req.body;
    const _user = await users.findOne({ where: { email: email } });
    if (_user)
      return res.status(404).json({ error: "User already registered" });
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await users.create({
      name: name,
      password: hashPassword,
      email: email,
      phone: phone,
      removed: 0,
    });
    res.json({ user });
  }

  async authorization(req, res) {
    const { email, password } = req.body;

    const user = await users.findOne({ where: { email: email } });
    if (!user) return res.status(404).json({ error: "User not found" });
    const inPassword = bcrypt.compareSync(password, user.password);
    if (!inPassword) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  }

  async deleteProfile(req, res) {
    const { id } = req.body;
    await users.update({ removed: 1 }, { where: { id: id } });
    res.json();
  }

  async getUsers(res) {
    const usersAll = await users.findAll({});
    res.json({ usersAll });
  }

  async requestResetPassword(req, res) {
    const { email } = req.body;
    const existingUser = await users.findOne({ where: { email } });
    if (!existingUser)
      return res
        .status(404)
        .json({ error: "User not found, password cant be reseted" });
    await requestResetPassword(email);
    res.json();
  }

  async confirmResetPassword(req, res) {
    const { otp, newPassword } = req.body;
    const email = await parserForEmail(otp);
    if (!email)
      return res.status(404).json({ error: "User or Code not found" });
    const existingUser = await users.findOne({ where: { email } });

    const hashedPassword = await bcrypt.hash(newPassword, 5);
    existingUser.password = hashedPassword;
    await existingUser.save();
    res.json();
  }
}

module.exports = new userController();

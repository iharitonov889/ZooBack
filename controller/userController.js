const { users } = require("../db");
const bcrypt = require("bcrypt");

class userController {
  async registration(req, res) {
    const { name, email, password, phone } = req.body;
    const _user = await users.findOne({ where: { email: email } });
    if (_user) return res.status(404).json({ error: "E-mail is used" });
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

  async getUsers(req, res) {
    const usersAll = await users.findAll({});
    res.json({ usersAll });
  }
}

module.exports = new userController();

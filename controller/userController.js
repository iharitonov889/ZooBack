const { users } = require("../db");
const bcrypt = require("bcrypt");
const { requestResetPassword } = require("../mailer.js");

const {
  parserForEmail,
  confirmOtp,
  parserForConfirm,
  parserForNoCopy,
} = require("../db/redis");

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

  async getUsers(req, res) {
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
    const { email, otp } = req.body;

    const existingUser = await users.findOne({ where: { email } });
    if (!existingUser) return res.status(404).json({ error: "User not found" });

    const existingOtp = await parserForEmail(otp);
    if (!existingOtp) return res.status(404).json({ error: "Code not found" });

    await parserForNoCopy(email);
    await confirmOtp(email);
    res.json();
  }
  async resetPassword(req, res) {
    const { email, newPassword } = req.body;
    const existingUser = await users.findOne({ where: { email } });
    if (!existingUser)
      return res
        .status(404)
        .json({ error: "User not found, password cant be reseted" });

    const confirmed = await parserForConfirm(email);
    if (!confirmed)
      return res
        .status(404)
        .json({ error: "User's OTP code is not confirmed" });

    await parserForNoCopy(email);

    const hashedPassword = await bcrypt.hash(newPassword, 5);
    existingUser.password = hashedPassword;
    await existingUser.save();
    return res.status(200).json({
      message:
        "You succesfully changed password, now you can login using your new password",
    });
    //res.json();
  }
}

module.exports = new userController();

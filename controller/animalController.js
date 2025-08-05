const { animals } = require("../db");

class animalController {
  async add(req, res) {
    const { type, description } = req.body;
    const animal = await animals.create({
      kind_of_animal: type,
      description: description,
      removed: 0,
    });
    res.json({ animal });
  }

  async deleteAnimal(req, res) {
    const { id } = req.body;
    await animals.update({ removed: 1 }, { where: { id: id } });
    res.json();
  }

  async getAnimal(req, res) {
    const { id } = req.body;
    const animalsAll = await animals.findOne({ where: { id: id } });
    res.json({ animalsAll });
  }

  async getAnimals(req, res) {
    const animalsAll = await animals.findAll();
    res.json({ animalsAll });
  }

  async update(req, res) {
    const { id, params } = req.body;
    console.log(params);
    await animals.update(params, { where: { id: id } });

    res.json();
  }
}

module.exports = new animalController();

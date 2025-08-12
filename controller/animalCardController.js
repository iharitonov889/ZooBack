const { animalCards, animals } = require("../db");

class animalCardController {
  async add(req, res) {
    const {
      photo,
      animal,
      aviary_number,
      birthday,
      moniker,
      description,
      food,
    } = req.body;

    const animalCard = await animalCards.create({
      photo: photo,
      animal: animal,
      aviary_number: aviary_number,
      birthday: birthday,
      moniker: moniker,
      description: description,
      food: food,
      removed: 0,
    });
    res.json({ animalCard });
  }

  async deleteAnimalCard(req, res) {
    const { id } = req.body;
    await animalCards.update({ removed: 1 }, { where: { id: id } });

    res.json();
  }

  async getAnimals(req, res) {
    const animalCardsAll = await animalCards.findAll({
      include: [
        {
          model: animals,
          as: "Animal",
          attributes: ["id", "kind_of_animal"],
        },
      ],
    });
    res.json({ animalCardsAll });
  }

  async update(req, res) {
    const { id } = req.body;
    const params = req.body;
    delete params.id;
    const animalCard = await animalCards.update(params, { where: { id: id } });
    res.json(params.photo);
  }
}

module.exports = new animalCardController();

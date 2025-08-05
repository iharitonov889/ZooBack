const Router = require("express");
const router = new Router();
const animalCardController = require("../controller/animalCardController");

router.post("/add", animalCardController.add);
router.get("/get", animalCardController.getAnimals);
router.delete("/delete", animalCardController.deleteAnimalCard);
router.post("/update", animalCardController.update);

module.exports = router;

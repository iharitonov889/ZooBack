const Router = require("express");
const router = new Router();
const animalController = require("../controller/animalController");

router.post("/add", animalController.add);
router.get("/get", animalController.getAnimals);
router.get("/getOne", animalController.getAnimal);
router.delete("/delete", animalController.deleteAnimal);
router.post("/update", animalController.update);

module.exports = router;

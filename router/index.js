const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const animalRouter = require("./animalRouter");
const animalCardRouter = require("./animalCardRouter");

router.use("/user", userRouter);
router.use("/animal", animalRouter);
router.use("/animalCard", animalCardRouter);

module.exports = router;

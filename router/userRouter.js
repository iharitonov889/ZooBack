const Router = require("express");
const router = new Router();
const userController = require("../controller/userController");

router.post("/registration", userController.registration);
router.post("/authorization", userController.authorization);
router.delete("/delete", userController.deleteProfile);
router.get("/get", userController.getUsers);

router.post("/requestResetPassword", userController.requestResetPassword);
router.post("/confirmResetPassword", userController.confirmResetPassword);
router.post("/resetPassword", userController.resetPassword);

module.exports = router;

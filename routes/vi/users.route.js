const express = require("express");
const userControllers = require("../../controllers/user.controller");
const validateBody = require("../../middlewares/validateBody");
const router = express.Router();

router.get("/all", userControllers.getAllUsers);
router.get("/random", userControllers.getRandomUser);
router.post("/save", validateBody, userControllers.saveAUser);
router.delete("/delete/:Id", userControllers.deleteAUser);
router.patch("/update/:Id", userControllers.updateAUser);

module.exports = router;

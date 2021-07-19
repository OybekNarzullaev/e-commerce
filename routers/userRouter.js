const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const Users = require("../models/userModel");

router.post("/register", userCtrl.register);

router.post("/login", userCtrl.login);

router.get("/logout", userCtrl.logout);

router.get("/refresh_token", userCtrl.refreshToken);

router.get("/infor", auth, userCtrl.getUser);

// vaqtinchalik
router.get("/", async (req, res) => {
  const users = await Users.find();
  return res.json(users);
});

module.exports = router;

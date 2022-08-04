const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../views/userController");

const router = require("express").Router();
const cors = require("cors");

router.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;

const {
  login,
  register,
  getAllUsers,
  getAllAllUsers,
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
router.get("/allUsers", getAllAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;

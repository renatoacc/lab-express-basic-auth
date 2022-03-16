const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const {
  isLoggedOut: requireToBeLoggedOut,
} = require("../middlewares/route-guard");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    //   const userExists = await User.exists({
    //     email: req.body.email,
    //   });
    //   if (userExists) {
    //     res.render("signup", { error: "Hey username already exists" });
    //     return;
    //   }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      // email: req.body.email,
      username: req.body.username,
      password: hash,
    });
    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    res.render("signup", { error: "Some kind of error happened" });
  }
});

router.use("/login", requireToBeLoggedOut);
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const dbHash = user.password;
    const passwordCorrect = await bcrypt.compare(req.body.password, dbHash);
    if (!passwordCorrect) {
      throw Error("Password incorrect");
    }
    req.session.currentUser = user;
    res.redirect("/profile");
  } catch (err) {
    res.render("login", { error: "Wrong username or password" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.redirect("/login");
  });
});

module.exports = router;

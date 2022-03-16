const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const MongoStore = require("connect-mongo");

const saltRounds = 10;
// GET home page
router.get("/", (req, res, next) => {
  res.render("index");
});

//GET signup page
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

// POST signup page
router.post("/signup", async (req, res, next) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(req.body.password, salt);
  const newUser = {
    username: req.body.username,
    password: hash,
  };
  await User.create(newUser);
  res.render("profile");
});

//GET login page
router.get("/login", (req, res, next) => {
  res.render("login");
});

//POST login page
router.post("/login", async (req, res, next) => {});

module.exports = router;

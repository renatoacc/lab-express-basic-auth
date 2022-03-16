const router = require("express").Router();
const { isLoggedIn: requireLogin } = require("../middlewares/route-guard");

router.use(requireLogin);
const renderProfilePage = (req, res) => {
  res.render("profile", { user: req.session.currentUser });
};
router.get("/profile", renderProfilePage);

const renderDetailsPage = (req, res) => {
  console.log(req.myOwnCustomKey);
  res.send("this is another route we can only see when logged in");
};
router.get("/details", renderDetailsPage);

module.exports = router;

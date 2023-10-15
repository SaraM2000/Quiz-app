const { Router } = require("express");
const { body } = require("express-validator");

const controllers = require("../controllers/auth");

const router = Router();

router.get("/login", controllers.getLogin);
router.get("/signup", controllers.getSignup);
router.post(
  "/login",
  [
    body("email")
      .exists()
      .withMessage("Email is required")
      .notEmpty()
      .withMessage("Email is required")
      .isString()
      .withMessage("Email must be string")
      .isEmail()
      .withMessage("Email is not valid")
      .normalizeEmail(),
    body("password")
      .exists()
      .withMessage("Password is required")
      .notEmpty()
      .withMessage("Password is required")
      .isString()
      .withMessage("Password must be string")
      .isStrongPassword()
      .withMessage("Password is weak"),
  ],
  controllers.postLogin
);

router.post(
  "/signup",
  [
    body("username")
      .exists()
      .withMessage("Username is required")
      .notEmpty()
      .withMessage("Username is required")
      .isString()
      .withMessage("Username must be string")
      .isLength({ min: 4 })
      .withMessage("Username is too short"),
    body("email")
      .exists()
      .withMessage("Email is required")
      .notEmpty()
      .withMessage("Email is required")
      .isString()
      .withMessage("Email must be string")
      .isEmail()
      .withMessage("Email is not valid")
      .normalizeEmail(),
    body("password")
      .exists()
      .withMessage("Password is required")
      .notEmpty()
      .withMessage("Password is required")
      .isString()
      .withMessage("Password must be string")
      .isStrongPassword()
      .withMessage("Password is weak"),
  ],
  controllers.postSignup
);

router.get("/menu", controllers.getMenu);
router.get("/questions", controllers.getQuestions);

router.get("/logout", controllers.getLogout);
router.get("/", (req, res) => res.redirect("/login"));

router.use((req, res) => res.render("404", { url: req.url }));

module.exports = router;

const express = require("express");

const {
  signup,
  login,
  getProfile,
} = require("../controllers/authController");

const {
  signupSchema,
  loginSchema,
} = require("../validators/authValidator");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==============================
// SIGNUP ROUTE
// ==============================

router.post("/signup", async (req, res) => {
  const validation = signupSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validation.error.issues,
    });
  }

  req.body = validation.data;

  await signup(req, res);
});


// ==============================
// LOGIN ROUTE
// ==============================

router.post("/login", async (req, res) => {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validation.error.issues,
    });
  }

  req.body = validation.data;

  await login(req, res);
});


// ==============================
// PROTECTED PROFILE ROUTE
// ==============================

router.get(
  "/profile",
  authMiddleware,
  getProfile
);


module.exports = router;
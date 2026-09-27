const express = require("express");

const {
  signup,
  login,
} = require("../controllers/authController");

const {
  signupSchema,
  loginSchema,
} = require("../validators/authValidator");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const validatedData = signupSchema.parse(req.body);

    req.body = validatedData;

    await signup(req, res);
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues,
      });
    }

    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    req.body = validatedData;

    await login(req, res);
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues,
      });
    }

    next(error);
  }
});

module.exports = router;
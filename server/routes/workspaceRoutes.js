const express = require("express");

const {
  createWorkspace,
  getMyWorkspaces,
  getWorkspaceById,
  updateWorkspace,
} = require("../controllers/workspaceController");

const {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} = require("../validators/workspaceValidator");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create workspace
router.post("/", authMiddleware, async (req, res) => {
  const validation = createWorkspaceSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validation.error.issues,
    });
  }

  req.body = validation.data;

  await createWorkspace(req, res);
});

// Get all workspaces for logged-in user
router.get("/", authMiddleware, getMyWorkspaces);

// Get one workspace by ID
router.get("/:id", authMiddleware, getWorkspaceById);

// Update workspace
router.put("/:id", authMiddleware, async (req, res) => {
  const validation = updateWorkspaceSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validation.error.issues,
    });
  }

  req.body = validation.data;

  await updateWorkspace(req, res);
});

module.exports = router;
const express = require("express");

const {
  createWorkspace,
  getMyWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
} = require("../controllers/workspaceController");

const {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} = require("../validators/workspaceValidator");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE WORKSPACE
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

// GET ALL WORKSPACES
router.get("/", authMiddleware, getMyWorkspaces);

// GET ONE WORKSPACE BY ID
router.get("/:id", authMiddleware, getWorkspaceById);

// UPDATE WORKSPACE
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

// DELETE WORKSPACE
router.delete("/:id", authMiddleware, deleteWorkspace);

module.exports = router;



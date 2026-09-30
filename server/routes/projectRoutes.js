const express = require("express");

const {
  createProject,
  getWorkspaceProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const {
  createProjectSchema,
  updateProjectSchema,
} = require("../validators/projectValidator");

const authMiddleware = require("../middleware/authMiddleware");

const {
  requireWorkspaceAdmin,
} = require("../middleware/workspaceRoleMiddleware");

const router = express.Router();

// CREATE PROJECT
router.post(
  "/:workspaceId/projects",
  authMiddleware,
  requireWorkspaceAdmin,
  async (req, res) => {
    const validation = createProjectSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    req.body = validation.data;
    await createProject(req, res);
  }
);

// GET ALL PROJECTS
router.get(
  "/:workspaceId/projects",
  authMiddleware,
  getWorkspaceProjects
);

// GET ONE PROJECT
router.get(
  "/:workspaceId/projects/:projectId",
  authMiddleware,
  getProjectById
);

// UPDATE PROJECT
router.put(
  "/:workspaceId/projects/:projectId",
  authMiddleware,
  requireWorkspaceAdmin,
  async (req, res) => {
    const validation = updateProjectSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    req.body = validation.data;
    await updateProject(req, res);
  }
);

// DELETE PROJECT
router.delete(
  "/:workspaceId/projects/:projectId",
  authMiddleware,
  requireWorkspaceAdmin,
  deleteProject
);

module.exports = router;
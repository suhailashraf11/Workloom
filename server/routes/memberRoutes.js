const express = require("express");

const {
  addMember,
  getWorkspaceMembers,
  updateMemberRole,
  removeMember,
} = require("../controllers/memberController");

const {
  addMemberSchema,
  updateMemberRoleSchema,
} = require("../validators/memberValidator");

const authMiddleware = require("../middleware/authMiddleware");

const {
  requireWorkspaceAdmin,
} = require("../middleware/workspaceRoleMiddleware");

const router = express.Router();

// ADD MEMBER
// Owner or Admin
router.post(
  "/:workspaceId/members",
  authMiddleware,
  requireWorkspaceAdmin,
  async (req, res) => {
    const validation = addMemberSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    req.body = validation.data;

    await addMember(req, res);
  }
);

// GET ALL MEMBERS
// Any workspace member
router.get(
  "/:workspaceId/members",
  authMiddleware,
  getWorkspaceMembers
);

// UPDATE MEMBER ROLE
// Controller will allow only workspace owner
router.put(
  "/:workspaceId/members/:userId/role",
  authMiddleware,
  async (req, res) => {
    const validation = updateMemberRoleSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    req.body = validation.data;

    await updateMemberRole(req, res);
  }
);

// REMOVE MEMBER
// Owner or Admin
router.delete(
  "/:workspaceId/members/:userId",
  authMiddleware,
  requireWorkspaceAdmin,
  removeMember
);

module.exports = router;
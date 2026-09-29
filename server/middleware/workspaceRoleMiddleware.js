const db = require("../config/db");

const requireWorkspaceAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const workspaceId = req.params.workspaceId;

    const [memberships] = await db.query(
      `
      SELECT role
      FROM workspace_members
      WHERE workspace_id = ?
        AND user_id = ?
      `,
      [workspaceId, userId]
    );

    if (memberships.length === 0) {
      return res.status(403).json({
        message: "You are not a member of this workspace",
      });
    }

    const role = memberships[0].role;

    if (role !== "owner" && role !== "admin") {
      return res.status(403).json({
        message: "Owner or admin permission required",
      });
    }

    req.workspaceRole = role;

    next();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while checking workspace permission",
    });
  }
};

module.exports = {
  requireWorkspaceAdmin,
};
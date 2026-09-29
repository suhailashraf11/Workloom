const db = require("../config/db");

// =====================================================
// ADD MEMBER
// OWNER or ADMIN can add a member
// =====================================================
const addMember = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const { email } = req.body;

    // Check whether workspace exists
    const [workspaces] = await db.query(
      `
      SELECT id, name, owner_id
      FROM workspaces
      WHERE id = ?
      `,
      [workspaceId]
    );

    if (workspaces.length === 0) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    // Permission was already checked by requireWorkspaceAdmin middleware

    // Find registered user using email
    const [users] = await db.query(
      `
      SELECT id, name, email
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "User with this email is not registered",
      });
    }

    const user = users[0];

    // Check whether user is already a member
    const [existingMembers] = await db.query(
      `
      SELECT id
      FROM workspace_members
      WHERE workspace_id = ?
        AND user_id = ?
      `,
      [workspaceId, user.id]
    );

    if (existingMembers.length > 0) {
      return res.status(409).json({
        message: "User is already a member of this workspace",
      });
    }

    // Add user as normal member
    await db.query(
      `
      INSERT INTO workspace_members (
        workspace_id,
        user_id,
        role
      )
      VALUES (?, ?, ?)
      `,
      [workspaceId, user.id, "member"]
    );

    res.status(201).json({
      message: "Member added successfully",
      member: {
        user_id: user.id,
        name: user.name,
        email: user.email,
        workspace_id: Number(workspaceId),
        role: "member",
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while adding workspace member",
    });
  }
};

// =====================================================
// GET ALL WORKSPACE MEMBERS
// Any workspace member can view members
// =====================================================
const getWorkspaceMembers = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const workspaceId = req.params.workspaceId;

    // Check whether logged-in user belongs to workspace
    const [membership] = await db.query(
      `
      SELECT id, role
      FROM workspace_members
      WHERE workspace_id = ?
        AND user_id = ?
      `,
      [workspaceId, loggedInUserId]
    );

    if (membership.length === 0) {
      return res.status(403).json({
        message: "You are not a member of this workspace",
      });
    }

    // Get all workspace members
    const [members] = await db.query(
      `
      SELECT
        u.id AS user_id,
        u.name,
        u.email,
        wm.role,
        wm.joined_at
      FROM workspace_members wm
      JOIN users u
        ON wm.user_id = u.id
      WHERE wm.workspace_id = ?
      ORDER BY wm.joined_at ASC
      `,
      [workspaceId]
    );

    res.status(200).json({
      message: "Workspace members fetched successfully",
      members,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while fetching workspace members",
    });
  }
};

// =====================================================
// UPDATE MEMBER ROLE
// ONLY OWNER can change roles
// =====================================================
const updateMemberRole = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const workspaceId = req.params.workspaceId;
    const targetUserId = req.params.userId;
    const { role } = req.body;

    // Check workspace
    const [workspaces] = await db.query(
      `
      SELECT id, owner_id
      FROM workspaces
      WHERE id = ?
      `,
      [workspaceId]
    );

    if (workspaces.length === 0) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    const workspace = workspaces[0];

    // Only owner can change roles
    if (workspace.owner_id !== loggedInUserId) {
      return res.status(403).json({
        message: "Only the workspace owner can change member roles",
      });
    }

    // Owner's role cannot be changed
    if (Number(targetUserId) === workspace.owner_id) {
      return res.status(403).json({
        message: "Workspace owner role cannot be changed",
      });
    }

    // Check target user belongs to workspace
    const [members] = await db.query(
      `
      SELECT id, role
      FROM workspace_members
      WHERE workspace_id = ?
        AND user_id = ?
      `,
      [workspaceId, targetUserId]
    );

    if (members.length === 0) {
      return res.status(404).json({
        message: "Member not found in this workspace",
      });
    }

    // Update role
    await db.query(
      `
      UPDATE workspace_members
      SET role = ?
      WHERE workspace_id = ?
        AND user_id = ?
      `,
      [role, workspaceId, targetUserId]
    );

    res.status(200).json({
      message: "Member role updated successfully",
      member: {
        user_id: Number(targetUserId),
        workspace_id: Number(workspaceId),
        role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while updating member role",
    });
  }
};

// =====================================================
// REMOVE MEMBER
// OWNER or ADMIN can access this action
// =====================================================
const removeMember = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const targetUserId = req.params.userId;

    // Role of logged-in user comes from workspaceRoleMiddleware
    const loggedInUserRole = req.workspaceRole;

    // Check workspace
    const [workspaces] = await db.query(
      `
      SELECT id, owner_id
      FROM workspaces
      WHERE id = ?
      `,
      [workspaceId]
    );

    if (workspaces.length === 0) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    const workspace = workspaces[0];

    // Nobody can remove workspace owner
    if (Number(targetUserId) === workspace.owner_id) {
      return res.status(403).json({
        message: "Workspace owner cannot be removed",
      });
    }

    // Find target member
    const [members] = await db.query(
      `
      SELECT
        wm.id,
        wm.role,
        u.name,
        u.email
      FROM workspace_members wm
      JOIN users u
        ON wm.user_id = u.id
      WHERE wm.workspace_id = ?
        AND wm.user_id = ?
      `,
      [workspaceId, targetUserId]
    );

    if (members.length === 0) {
      return res.status(404).json({
        message: "Member not found in this workspace",
      });
    }

    const member = members[0];

    // Admin cannot remove another admin
    if (
      loggedInUserRole === "admin" &&
      member.role === "admin"
    ) {
      return res.status(403).json({
        message: "Admin cannot remove another admin",
      });
    }

    // Remove member
    await db.query(
      `
      DELETE FROM workspace_members
      WHERE workspace_id = ?
        AND user_id = ?
      `,
      [workspaceId, targetUserId]
    );

    res.status(200).json({
      message: "Member removed successfully",
      member: {
        user_id: Number(targetUserId),
        name: member.name,
        email: member.email,
        workspace_id: Number(workspaceId),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while removing workspace member",
    });
  }
};

module.exports = {
  addMember,
  getWorkspaceMembers,
  updateMemberRole,
  removeMember,
};
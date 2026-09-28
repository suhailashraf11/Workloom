const db = require("../config/db");

const createWorkspace = async (req, res) => {
  let connection;

  try {
    const { name } = req.body;
    const ownerId = req.user.id;

    connection = await db.getConnection();

    await connection.beginTransaction();

    // Create workspace
    const [workspaceResult] = await connection.query(
      `INSERT INTO workspaces (name, owner_id)
       VALUES (?, ?)`,
      [name, ownerId]
    );

    const workspaceId = workspaceResult.insertId;

    // Add the workspace owner as a workspace member
    await connection.query(
      `INSERT INTO workspace_members (
        workspace_id,
        user_id,
        role
      )
      VALUES (?, ?, ?)`,
      [workspaceId, ownerId, "owner"]
    );

    await connection.commit();

    res.status(201).json({
      message: "Workspace created successfully",
      workspace: {
        id: workspaceId,
        name,
        owner_id: ownerId,
      },
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error(error);

    res.status(500).json({
      message: "Server error while creating workspace",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

const getMyWorkspaces = async (req, res) => {
  try {
    const userId = req.user.id;

    const [workspaces] = await db.query(
      `
      SELECT
        w.id,
        w.name,
        w.owner_id,
        wm.role,
        w.created_at,
        w.updated_at
      FROM workspace_members wm
      JOIN workspaces w
        ON wm.workspace_id = w.id
      WHERE wm.user_id = ?
      ORDER BY w.created_at DESC
      `,
      [userId]
    );

    res.status(200).json({
      message: "Workspaces fetched successfully",
      workspaces,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while fetching workspaces",
    });
  }
};

const getWorkspaceById = async (req, res) => {
  try {
    const userId = req.user.id;
    const workspaceId = req.params.id;

    const [workspaces] = await db.query(
      `
      SELECT
        w.id,
        w.name,
        w.owner_id,
        wm.role,
        w.created_at,
        w.updated_at
      FROM workspace_members wm
      JOIN workspaces w
        ON wm.workspace_id = w.id
      WHERE wm.user_id = ?
        AND w.id = ?
      `,
      [userId, workspaceId]
    );

    if (workspaces.length === 0) {
      return res.status(404).json({
        message: "Workspace not found or access denied",
      });
    }

    res.status(200).json({
      message: "Workspace fetched successfully",
      workspace: workspaces[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while fetching workspace",
    });
  }
};

const updateWorkspace = async (req, res) => {
  try {
    const userId = req.user.id;
    const workspaceId = req.params.id;
    const { name } = req.body;

    // Check whether the workspace exists
    // and whether the logged-in user is the owner
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

    if (workspace.owner_id !== userId) {
      return res.status(403).json({
        message: "Only the workspace owner can update this workspace",
      });
    }

    // Update workspace name
    await db.query(
      `
      UPDATE workspaces
      SET name = ?
      WHERE id = ?
      `,
      [name, workspaceId]
    );

    res.status(200).json({
      message: "Workspace updated successfully",
      workspace: {
        id: Number(workspaceId),
        name,
        owner_id: userId,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while updating workspace",
    });
  }
};

module.exports = {
  createWorkspace,
  getMyWorkspaces,
  getWorkspaceById,
  updateWorkspace,
};
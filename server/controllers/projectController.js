const db = require("../config/db");

// =====================================================
// CREATE PROJECT
// OWNER or ADMIN can create projects
// =====================================================
const createProject = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const createdBy = req.user.id;
    const { name, description } = req.body;

    const [workspaces] = await db.query(
      `
      SELECT id, name
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

    const [result] = await db.query(
      `
      INSERT INTO projects (
        workspace_id,
        name,
        description,
        created_by
      )
      VALUES (?, ?, ?, ?)
      `,
      [workspaceId, name, description, createdBy]
    );

    res.status(201).json({
      message: "Project created successfully",
      project: {
        id: result.insertId,
        workspace_id: Number(workspaceId),
        name,
        description,
        created_by: createdBy,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while creating project",
    });
  }
};

// =====================================================
// GET ALL PROJECTS IN WORKSPACE
// Any workspace member can view projects
// =====================================================
const getWorkspaceProjects = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const loggedInUserId = req.user.id;

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

    const [projects] = await db.query(
      `
      SELECT
        p.id,
        p.workspace_id,
        p.name,
        p.description,
        p.created_by,
        u.name AS created_by_name,
        p.created_at,
        p.updated_at
      FROM projects p
      JOIN users u
        ON p.created_by = u.id
      WHERE p.workspace_id = ?
      ORDER BY p.created_at DESC
      `,
      [workspaceId]
    );

    res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while fetching projects",
    });
  }
};

// =====================================================
// GET ONE PROJECT BY ID
// Any workspace member can view project
// =====================================================
const getProjectById = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const projectId = req.params.projectId;
    const loggedInUserId = req.user.id;

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

    const [projects] = await db.query(
      `
      SELECT
        p.id,
        p.workspace_id,
        p.name,
        p.description,
        p.created_by,
        u.name AS created_by_name,
        p.created_at,
        p.updated_at
      FROM projects p
      JOIN users u
        ON p.created_by = u.id
      WHERE p.id = ?
        AND p.workspace_id = ?
      `,
      [projectId, workspaceId]
    );

    if (projects.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project fetched successfully",
      project: projects[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while fetching project",
    });
  }
};

// =====================================================
// UPDATE PROJECT
// OWNER or ADMIN can update projects
// =====================================================
const updateProject = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const projectId = req.params.projectId;
    const { name, description } = req.body;

    const [projects] = await db.query(
      `
      SELECT id
      FROM projects
      WHERE id = ?
        AND workspace_id = ?
      `,
      [projectId, workspaceId]
    );

    if (projects.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await db.query(
      `
      UPDATE projects
      SET name = ?, description = ?
      WHERE id = ?
        AND workspace_id = ?
      `,
      [name, description, projectId, workspaceId]
    );

    res.status(200).json({
      message: "Project updated successfully",
      project: {
        id: Number(projectId),
        workspace_id: Number(workspaceId),
        name,
        description,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while updating project",
    });
  }
};

// =====================================================
// DELETE PROJECT
// OWNER or ADMIN can delete projects
// =====================================================
const deleteProject = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const projectId = req.params.projectId;

    const [projects] = await db.query(
      `
      SELECT id, name
      FROM projects
      WHERE id = ?
        AND workspace_id = ?
      `,
      [projectId, workspaceId]
    );

    if (projects.length === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const project = projects[0];

    await db.query(
      `
      DELETE FROM projects
      WHERE id = ?
        AND workspace_id = ?
      `,
      [projectId, workspaceId]
    );

    res.status(200).json({
      message: "Project deleted successfully",
      project: {
        id: Number(projectId),
        name: project.name,
        workspace_id: Number(workspaceId),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error while deleting project",
    });
  }
};

module.exports = {
  createProject,
  getWorkspaceProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
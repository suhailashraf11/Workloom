const { z } = require("zod");

const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Workspace name must be at least 2 characters")
    .max(150, "Workspace name cannot exceed 150 characters"),
});

const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Workspace name must be at least 2 characters")
    .max(150, "Workspace name cannot exceed 150 characters"),
});

module.exports = {
  createWorkspaceSchema,
  updateWorkspaceSchema,
};
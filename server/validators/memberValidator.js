const { z } = require("zod");

// Add member validation
const addMemberSchema = z.object({
  email: z.email("Enter a valid email address"),
});

// Update member role validation
const updateMemberRoleSchema = z.object({
  role: z.enum(["admin", "member"], {
    message: "Role must be admin or member",
  }),
});

module.exports = {
  addMemberSchema,
  updateMemberRoleSchema,
};
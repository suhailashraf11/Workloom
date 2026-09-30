# Phase 6 — Projects

## Project

CollabFlow — Real-Time Team Project Management Platform

## Phase Progress

Phase 6 Complete — 55% overall project progress.

---

## 1. Goal

Phase 6 implements project management inside a workspace.

Projects belong to workspaces and are created by authenticated workspace users with the required permissions.

---

## 2. Project Permissions

### Owner

Owner can:

- Create projects
- View projects
- View individual projects
- Update projects
- Delete projects

### Admin

Admin can:

- Create projects
- View projects
- View individual projects
- Update projects
- Delete projects

### Member

Member can:

- View projects
- View individual projects

Member cannot:

- Create projects
- Update projects
- Delete projects

---

## 3. Create Project

Endpoint:

POST /api/workspaces/:workspaceId/projects

Example body:

{
  "name": "CollabFlow Platform",
  "description": "Main workspace project"
}

Owner or admin permission is required.

---

## 4. Get All Projects

Endpoint:

GET /api/workspaces/:workspaceId/projects

Any workspace member can view projects.

The API checks workspace membership before returning project data.

---

## 5. Get Project By ID

Endpoint:

GET /api/workspaces/:workspaceId/projects/:projectId

The backend verifies:

- User belongs to workspace
- Project exists
- Project belongs to the requested workspace

---

## 6. Update Project

Endpoint:

PUT /api/workspaces/:workspaceId/projects/:projectId

Owner or admin permission is required.

Example body:

{
  "name": "Updated Project Name",
  "description": "Updated description"
}

---

## 7. Delete Project

Endpoint:

DELETE /api/workspaces/:workspaceId/projects/:projectId

Only owner or admin can delete projects.

The project must belong to the requested workspace.

---

## 8. Validation

Zod is used for project validation.

Project name:

- Required
- Minimum 2 characters
- Maximum 150 characters

Project description:

- Optional
- Maximum 1000 characters

---

## 9. Role-Based Access Control

The existing workspaceRoleMiddleware is reused.

requireWorkspaceAdmin allows:

- owner
- admin

Normal members are blocked from project write operations.

---

## 10. Database

The projects table connects projects to:

- workspace_id
- created_by

Important relationships:

Workspace
→ Projects

User
→ Created Projects

---

## 11. APIs Completed

POST /api/workspaces/:workspaceId/projects

GET /api/workspaces/:workspaceId/projects

GET /api/workspaces/:workspaceId/projects/:projectId

PUT /api/workspaces/:workspaceId/projects/:projectId

DELETE /api/workspaces/:workspaceId/projects/:projectId

---

## 12. Files Added

server/controllers/projectController.js

server/routes/projectRoutes.js

server/validators/projectValidator.js

---

## 13. Testing Completed

- Owner can create project
- Admin can create project
- Member cannot create project
- Workspace members can view projects
- Workspace members can view individual project
- Owner can update project
- Admin can update project
- Member cannot update project
- Owner can delete project
- Admin can delete project
- Member cannot delete project
- Invalid project access tested
- JWT authentication tested
- Project validation tested

---

## 14. Concepts Learned

- REST CRUD APIs
- Project-workspace relationships
- Role-Based Access Control
- JWT authentication
- Authorization
- Express middleware
- Route parameters
- SQL INSERT
- SQL SELECT
- SQL UPDATE
- SQL DELETE
- SQL JOIN
- Zod validation
- HTTP 403
- HTTP 404

---

## Phase 6 Status

Phase 6 — Projects

Status: COMPLETE

Overall CollabFlow Progress: 55%
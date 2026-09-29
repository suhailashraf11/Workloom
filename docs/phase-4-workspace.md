# Phase 4 — Workspace System

## Project
CollabFlow — Real-Time Team Project Management Platform

## Phase Progress
Phase 4 Complete — 35% overall project progress.

---

## 1. Goal

The goal of Phase 4 was to build the workspace system.

A workspace acts as the main container where users can later manage:

- Team members
- Projects
- Tasks
- Comments
- Activity

---

## 2. Features Completed

### Create Workspace

Endpoint:

POST /api/workspaces

The logged-in user can create a new workspace.

When a workspace is created:

1. Workspace is inserted into the `workspaces` table.
2. The logged-in user becomes the workspace owner.
3. The owner is automatically added to the `workspace_members` table.
4. Role is stored as `owner`.

---

### Get All Workspaces

Endpoint:

GET /api/workspaces

Returns all workspaces where the logged-in user is a member.

The user is identified using the JWT token.

Tables used:

- workspaces
- workspace_members

A SQL JOIN is used to retrieve workspace and membership information.

---

### Get Workspace By ID

Endpoint:

GET /api/workspaces/:id

Returns one workspace.

The API checks whether the logged-in user belongs to that workspace.

Example:

GET /api/workspaces/3

---

### Update Workspace

Endpoint:

PUT /api/workspaces/:id

Allows the workspace owner to update the workspace name.

Example request:

{
  "name": "Engineering Team"
}

Only the workspace owner can perform this action.

If another user tries to update it:

403 Forbidden

---

### Delete Workspace

Endpoint:

DELETE /api/workspaces/:id

Allows only the workspace owner to delete a workspace.

The API first checks:

1. Workspace exists.
2. Logged-in user is the owner.
3. If authorized, workspace is deleted.

Related workspace membership records are removed through the database relationship.

---

## 3. Authentication

All workspace APIs are protected using JWT authentication.

Request flow:

Client
↓
Bearer Token
↓
authMiddleware
↓
JWT Verification
↓
req.user
↓
Workspace Controller

The authenticated user's ID is available using:

req.user.id

---

## 4. Authorization

Authentication tells us:

"Who is the user?"

Authorization tells us:

"What is this user allowed to do?"

In Phase 4:

- Workspace members can view permitted workspaces.
- Workspace owners can update their workspace.
- Workspace owners can delete their workspace.

---

## 5. Validation

Zod is used to validate workspace data.

Workspace name rules:

- Must be a string
- Minimum 2 characters
- Maximum 150 characters
- Extra spaces are trimmed

Validators used:

- createWorkspaceSchema
- updateWorkspaceSchema

---

## 6. Database Tables Used

### workspaces

Stores:

- Workspace ID
- Workspace name
- Owner ID
- Created date
- Updated date

### workspace_members

Stores:

- Workspace ID
- User ID
- Role
- Joined date

This table connects users with workspaces.

---

## 7. SQL Concepts Used

Phase 4 used:

- INSERT
- SELECT
- UPDATE
- DELETE
- JOIN
- WHERE
- ORDER BY
- Foreign Keys
- Transactions

---

## 8. Transaction

Workspace creation uses a database transaction.

Process:

BEGIN TRANSACTION
↓
Create Workspace
↓
Add Owner to workspace_members
↓
COMMIT

If something fails:

ROLLBACK

This prevents partially-created workspace data.

---

## 9. APIs Completed

POST   /api/workspaces

GET    /api/workspaces

GET    /api/workspaces/:id

PUT    /api/workspaces/:id

DELETE /api/workspaces/:id

---

## 10. Testing

The APIs were tested using Postman.

Tests completed:

- Create workspace
- Get all workspaces
- Get workspace by ID
- Update workspace
- Owner permission check
- Delete workspace
- Verify deleted workspace
- Missing JWT token
- Invalid workspace access

---

## 11. Important Concepts Learned

- CRUD operations
- JWT protected routes
- Authentication
- Authorization
- Route parameters
- req.params
- req.body
- req.user
- SQL JOIN
- Database transactions
- Workspace ownership
- Many-to-many relationships
- Zod validation
- HTTP status codes

---

## Phase 4 Status

Phase 4 — Workspace System

Status: COMPLETE

Overall CollabFlow Progress: 35%
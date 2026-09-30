# Phase 5 — Roles & Team Members

## Project

CollabFlow — Real-Time Team Project Management Platform

## Phase Progress

Phase 5 Complete — 45% overall project progress.

---

## 1. Goal

The goal of Phase 5 was to build workspace team management and role-based access control.

The system supports three workspace roles:

- owner
- admin
- member

---

## 2. Owner Role

Owner can:

- View workspace members
- Add members
- Change member roles
- Remove normal members
- Remove admins

Owner protection:

- Owner cannot be removed through the member removal API.
- Owner role cannot be changed through the member role API.

---

## 3. Admin Role

Admin can:

- View workspace members
- Add members
- Remove normal members

Admin cannot:

- Change member roles
- Remove workspace owner
- Remove another admin

---

## 4. Member Role

Member can:

- View workspace members

Member cannot:

- Add members
- Change roles
- Remove members

---

## 5. Add Member API

Endpoint:

POST /api/workspaces/:workspaceId/members

Example body:

{
  "email": "user@example.com"
}

The backend checks:

1. JWT authentication
2. Workspace role
3. User exists
4. User is not already a member
5. Adds user with role "member"

---

## 6. Get Workspace Members

Endpoint:

GET /api/workspaces/:workspaceId/members

Any workspace member can view the workspace team.

Returned information includes:

- user_id
- name
- email
- role
- joined_at

---

## 7. Update Member Role

Endpoint:

PUT /api/workspaces/:workspaceId/members/:userId/role

Example:

{
  "role": "admin"
}

Only the workspace owner can change member roles.

Allowed roles:

- admin
- member

---

## 8. Remove Member

Endpoint:

DELETE /api/workspaces/:workspaceId/members/:userId

Rules:

- Owner can remove members
- Owner can remove admins
- Admin can remove normal members
- Admin cannot remove another admin
- Admin cannot remove owner
- Member cannot remove users
- Owner cannot be removed

---

## 9. Duplicate Member Protection

The backend checks:

workspace_id
+
user_id

before adding a member.

If the user already belongs to the workspace:

409 Conflict

is returned.

---

## 10. Role-Based Access Control

Middleware created:

workspaceRoleMiddleware.js

It checks the current workspace role from the workspace_members table.

Roles used:

- owner
- admin
- member

---

## 11. Files Added

server/controllers/memberController.js

server/routes/memberRoutes.js

server/validators/memberValidator.js

server/middleware/workspaceRoleMiddleware.js

---

## 12. APIs Completed

POST /api/workspaces/:workspaceId/members

GET /api/workspaces/:workspaceId/members

PUT /api/workspaces/:workspaceId/members/:userId/role

DELETE /api/workspaces/:workspaceId/members/:userId

---

## 13. Testing Completed

- Owner can add members
- Admin can add members
- Member cannot add members
- Workspace members can view members
- Owner can change roles
- Admin cannot change roles
- Member cannot change roles
- Owner can remove members
- Admin can remove normal members
- Member cannot remove members
- Admin cannot remove owner
- Admin cannot remove another admin
- Owner cannot be removed
- Duplicate members are blocked
- JWT protection tested

---

## 14. Concepts Learned

- Role-Based Access Control
- Authentication
- Authorization
- Middleware
- JWT
- SQL JOIN
- Membership relationships
- Route parameters
- Zod validation
- HTTP 403
- HTTP 404
- HTTP 409

---

## Phase 5 Status

Phase 5 — Roles & Team Members

Status: COMPLETE

Overall CollabFlow Progress: 45%
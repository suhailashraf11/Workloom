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

## 2. Roles

### Owner

The workspace owner has the highest level of workspace permission.

Owner can:

- View members
- Add members
- Change member roles
- Remove members
- Remove admins

The owner cannot be removed using the normal member removal API.

### Admin

Admin can:

- View workspace members
- Add members
- Remove normal members

Admin cannot:

- Change member roles
- Remove workspace owner
- Remove another admin

### Member

Member can:

- View workspace members

Member cannot:

- Add members
- Change roles
- Remove members

---

## 3. Add Member

Endpoint:

POST /api/workspaces/:workspaceId/members

Request body:

{
  "email": "user@example.com"
}

The user must already have a registered CollabFlow account.

The API checks:

1. JWT authentication
2. Workspace permission
3. User exists
4. User is not already a workspace member
5. User is inserted with role "member"

---

## 4. Get Workspace Members

Endpoint:

GET /api/workspaces/:workspaceId/members

Any user who belongs to the workspace can view the workspace member list.

The API joins:

workspace_members
+
users

Returned information includes:

- user_id
- name
- email
- role
- joined_at

---

## 5. Update Member Role

Endpoint:

PUT /api/workspaces/:workspaceId/members/:userId/role

Example request:

{
  "role": "admin"
}

Only the workspace owner can change roles.

Allowed role values:

- admin
- member

The owner's role cannot be changed using this API.

---

## 6. Remove Member

Endpoint:

DELETE /api/workspaces/:workspaceId/members/:userId

Owner can remove members and admins.

Admin can remove normal members.

Admin cannot remove another admin.

Nobody can remove the workspace owner using this endpoint.

---

## 7. Duplicate Member Protection

Before inserting a workspace member, the backend checks:

workspace_id
+
user_id

If the membership already exists:

409 Conflict

is returned.

---

## 8. Role-Based Access Control

A middleware was created:

workspaceRoleMiddleware.js

It checks the logged-in user's role from the workspace_members table.

The middleware allows:

owner
or
admin

for protected team management operations.

---

## 9. Authentication and Authorization

Authentication answers:

Who is the user?

JWT authentication provides:

req.user.id

Authorization answers:

What is the user allowed to do?

Workspace roles determine permissions.

---

## 10. Files Added

server/controllers/memberController.js

server/routes/memberRoutes.js

server/validators/memberValidator.js

server/middleware/workspaceRoleMiddleware.js

---

## 11. APIs Completed

POST /api/workspaces/:workspaceId/members

GET /api/workspaces/:workspaceId/members

PUT /api/workspaces/:workspaceId/members/:userId/role

DELETE /api/workspaces/:workspaceId/members/:userId

---

## 12. Testing Completed

- Owner can add member
- Admin can add member
- Member cannot add member
- Workspace members can view team
- Owner can change member roles
- Member cannot change roles
- Admin cannot change roles
- Owner can remove member
- Admin can remove normal member
- Member cannot remove member
- Admin cannot remove owner
- Admin cannot remove another admin
- Owner cannot be removed
- Duplicate members are blocked
- JWT protected endpoints tested

---

## 13. Concepts Learned

- Role-Based Access Control
- Authentication
- Authorization
- Middleware
- JWT
- Route parameters
- SQL JOIN
- INSERT
- UPDATE
- DELETE
- Membership relationships
- Permission checks
- HTTP 403
- HTTP 404
- HTTP 409
- Zod validation

---

## Phase 5 Status

Phase 5 — Roles & Team Members

Status: COMPLETE

Overall CollabFlow Progress: 45%
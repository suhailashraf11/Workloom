# CollabFlow Database Design

## 1. users

Stores registered users.

Columns:
- id
- name
- email
- password
- created_at
- updated_at

---

## 2. workspaces

Stores team workspaces.

Columns:
- id
- name
- owner_id
- created_at
- updated_at

Relationship:
owner_id -> users.id

---

## 3. workspace_members

Connects users with workspaces.

Columns:
- id
- workspace_id
- user_id
- role
- joined_at

Relationships:
workspace_id -> workspaces.id
user_id -> users.id

---

## 4. projects

Stores projects inside workspaces.

Columns:
- id
- workspace_id
- name
- description
- created_by
- created_at
- updated_at

Relationships:
workspace_id -> workspaces.id
created_by -> users.id

---

## 5. tasks

Stores project tasks.

Columns:
- id
- project_id
- title
- description
- status
- priority
- assigned_to
- created_by
- due_date
- created_at
- updated_at

Relationships:
project_id -> projects.id
assigned_to -> users.id
created_by -> users.id

---

## 6. comments

Stores comments added to tasks.

Columns:
- id
- task_id
- user_id
- content
- created_at
- updated_at

Relationships:
task_id -> tasks.id
user_id -> users.id

---

## 7. activity_logs

Stores workspace activity history.

Columns:
- id
- workspace_id
- user_id
- action
- entity_type
- entity_id
- created_at

Relationships:
workspace_id -> workspaces.id
user_id -> users.id
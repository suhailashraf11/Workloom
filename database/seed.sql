USE collabflow;

-- --------------------------------------------------
-- TEST USERS
-- --------------------------------------------------

INSERT INTO users (name, email, password)
VALUES
('Suhail Test', 'suhail.test@collabflow.local', 'test-password'),
('Javed Test', 'javed.test@collabflow.local', 'test-password');

-- Get their IDs and keep them in temporary variables
SET @suhail_id = (
    SELECT id
    FROM users
    WHERE email = 'suhail.test@collabflow.local'
);

SET @javed_id = (
    SELECT id
    FROM users
    WHERE email = 'javed.test@collabflow.local'
);

-- --------------------------------------------------
-- WORKSPACE
-- --------------------------------------------------

INSERT INTO workspaces (name, owner_id)
VALUES ('Demo Workspace', @suhail_id);

SET @workspace_id = LAST_INSERT_ID();

-- --------------------------------------------------
-- WORKSPACE MEMBERS
-- --------------------------------------------------

INSERT INTO workspace_members (workspace_id, user_id, role)
VALUES
(@workspace_id, @suhail_id, 'owner'),
(@workspace_id, @javed_id, 'member');

-- --------------------------------------------------
-- PROJECT
-- --------------------------------------------------

INSERT INTO projects (
    workspace_id,
    name,
    description,
    created_by
)
VALUES (
    @workspace_id,
    'CollabFlow Demo Project',
    'Demo project used to test database relationships',
    @suhail_id
);

SET @project_id = LAST_INSERT_ID();

-- --------------------------------------------------
-- TASK
-- --------------------------------------------------

INSERT INTO tasks (
    project_id,
    title,
    description,
    status,
    priority,
    assigned_to,
    created_by,
    due_date
)
VALUES (
    @project_id,
    'Create Login Page',
    'Build the login page for CollabFlow',
    'todo',
    'high',
    @javed_id,
    @suhail_id,
    '2026-10-10'
);

SET @task_id = LAST_INSERT_ID();

-- --------------------------------------------------
-- COMMENTS
-- --------------------------------------------------

INSERT INTO comments (
    task_id,
    user_id,
    content
)
VALUES
(
    @task_id,
    @suhail_id,
    'Please start working on the login page.'
),
(
    @task_id,
    @javed_id,
    'Okay, I will start working on it.'
);

-- --------------------------------------------------
-- ACTIVITY LOG
-- --------------------------------------------------

INSERT INTO activity_logs (
    workspace_id,
    user_id,
    action,
    entity_type,
    entity_id
)
VALUES (
    @workspace_id,
    @suhail_id,
    'Created task: Create Login Page',
    'task',
    @task_id
);
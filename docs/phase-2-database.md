# Phase 2 - MySQL Database Design

## Objective

Design and test the relational database for CollabFlow using MySQL.

## Database

Database name:

collabflow

## Tables Created

1. users
2. workspaces
3. workspace_members
4. projects
5. tasks
6. comments
7. activity_logs

## Main Relationships

users -> workspaces

users <-> workspace_members <-> workspaces

workspaces -> projects

projects -> tasks

users -> tasks

tasks -> comments

users -> comments

workspaces -> activity_logs

users -> activity_logs

## Concepts Learned

- Database
- Table
- Row
- Column
- Primary Key
- Foreign Key
- AUTO_INCREMENT
- NOT NULL
- UNIQUE
- VARCHAR
- TEXT
- DATE
- TIMESTAMP
- One-to-Many Relationship
- Many-to-Many Relationship
- Normalization
- INSERT
- SELECT
- DELETE
- JOIN
- LEFT JOIN

## Database Files

database/schema.sql

Contains the complete database structure.

database/seed.sql

Contains sample data used for testing relationships.

## Testing Completed

- Created users table
- Created workspace relationship
- Created workspace membership relationship
- Created projects
- Created tasks
- Created comments
- Created activity logs
- Inserted sample data
- Tested foreign keys
- Tested task JOIN query
- Tested comments JOIN query

## Result

MySQL database design and relationships are working successfully.

## Progress
cd 
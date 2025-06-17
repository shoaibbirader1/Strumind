# Migrations

This directory will contain Alembic migration scripts for database schema changes.

- To create a new migration: `alembic revision --autogenerate -m "message"`
- To apply migrations: `alembic upgrade head` 
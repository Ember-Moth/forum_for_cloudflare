-- Add csrf_token column to sessions table for CSRF protection
ALTER TABLE sessions ADD COLUMN csrf_token TEXT;

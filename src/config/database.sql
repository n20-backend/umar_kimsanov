CREATE DATABASE ToDo;
create extension "uuid-ossp";


CREATE TYPE role_role AS ENUM ('user', 'admin', 'moderator');
CREATE TYPE user_role_status AS ENUM ('active', 'inactive');
CREATE TYPE status_task AS ENUM ('pending', 'in_progress', 'completed');


CREATE TABLE users (
    user_id UUID PRIMARY KEY default uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role role_role DEFAULT 'user',
    role_status user_role_status DEFAULT 'active',
    created_at TIMESTAMP  DEFAULT now(),
    updated_at TIMESTAMP  DEFAULT now()
);
--not added yet

CREATE TABLE lists (
    list_id UUID PRIMARY KEY default uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE priorities (
    priority_id UUID PRIMARY KEY default uuid_generate_v4(),
    priority_name VARCHAR(255) NOT NULL,
    level SMALLINT DEFAULT 1 CHECK (level BETWEEN 1 AND 3),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE tasks (
    task_id UUID PRIMARY KEY default uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    list_id UUID NOT NULL REFERENCES lists(list_id) ON DELETE CASCADE,
    priority_id UUID NOT NULL REFERENCES priorities(priority_id) ON DELETE CASCADE,
    due_date DATE DEFAULT (now()::DATE),
    task_status status_task DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE tags (
    tag_id UUID PRIMARY KEY default uuid_generate_v4(),
    tag_name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE task_tags (
    task_id UUID NOT NULL REFERENCES tasks(task_id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, tag_id),
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
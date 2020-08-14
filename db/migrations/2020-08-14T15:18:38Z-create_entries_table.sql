CREATE TABLE IF NOT EXISTS entries (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    entry TEXT NOT NULL,
    entry_date DATE NOT NULL,
    tag VARCHAR(255) DEFAULT NULL,
    entry_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
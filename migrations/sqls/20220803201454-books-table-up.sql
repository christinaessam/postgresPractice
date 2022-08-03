CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    author VARCHAR(30),
    total_pages integer,
    type VARCHAR(30),
    summary text
);
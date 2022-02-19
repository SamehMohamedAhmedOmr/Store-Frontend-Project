CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price FLOAT,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

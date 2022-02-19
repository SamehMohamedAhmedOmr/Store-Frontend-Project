CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,

    order_id INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,

    product_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

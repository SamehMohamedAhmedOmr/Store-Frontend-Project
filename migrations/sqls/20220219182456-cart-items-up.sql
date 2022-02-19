CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,

    cart_id INTEGER NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES cart (id) ON DELETE CASCADE,

    product_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

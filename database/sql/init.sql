DROP TABLE IF EXISTS paintings CASCADE;
/* painting_id would be serial ideally, but since the stock number allocation
already exists, it is a standard INT for now */
CREATE TABLE paintings (
    painting_id integer PRIMARY KEY,
    artist varchar (100) NOT NULL,
    description text
);

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
    product_id serial PRIMARY KEY,
    painting_id integer NOT NULL,
    product_type VARCHAR(50) NOT NULL,
    price DECIMAL NOT NULL,
    stock integer,
    FOREIGN KEY (painting_id) REFERENCES paintings(painting_id)
);

DROP TABLE IF EXISTS carts CASCADE;
CREATE TABLE carts (
    cart_id serial PRIMARY KEY,
    user_id integer,
    CONSTRAINT unique_user_cart UNIQUE (user_id)
);

DROP TABLE IF EXISTS cart_products;
CREATE TABLE cart_products (
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    PRIMARY KEY (cart_id, product_id),
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

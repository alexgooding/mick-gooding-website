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

DROP TABLE IF EXISTS carts;
CREATE TABLE carts (
    cart_id serial PRIMARY KEY,
    user_id integer,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

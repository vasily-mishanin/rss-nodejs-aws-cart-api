-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');

/*
create table cart(
id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
user_id uuid NOT NULL,
created_at DATE NOT NULL,
updated_at DATE NOT NULL,
status cart_status NOT NULL
); 
*/

/*
create table cart_item(
product_id uuid NOT NULL,
count INT
);
*/

-- alter table cart_item add column cart_id uuid references cart(id); 

/*
create table orders(
id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY, 
user_id uuid NOT NULL, 
cart_id UUID REFERENCES cart(id),
payment JSON,
delivery JSON,
comments TEXT,
status cart_status,
total NUMERIC
);
*/

/*
create table users(
id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY, 
name text,
email text, 
password text
);
*/

-- ALTER TABLE cart DROP COLUMN user_id;
-- ALTER TABLE orders DROP COLUMN user_id;


-- ALTER TABLE cart ADD COLUMN user_id UUID REFERENCES users(id);
-- ALTER TABLE orders ADD COLUMN user_id UUID REFERENCES users(id);


/*
INSERT INTO cart (id, user_id, created_at, updated_at, status)
VALUES (
    uuid_generate_v4(),
    uuid_generate_v4(), -- Replace with the actual user_id
    current_date, -- current_date gives the current date without the time part
    current_date,
    'your_status_here' -- Replace with the actual status
);
*/

/*
INSERT INTO users (id, name, email, password)
VALUES
    (uuid_generate_v4(), 'John Doe', 'john.doe@example.com', 'password123'),
    (uuid_generate_v4(), 'Caroline Smith', 'car.sm@example.com', 'securepass');
*/

/*
-- Insert a new cart for user 'John Doe'
INSERT INTO cart (id, user_id, created_at, updated_at, status)
VALUES (
    uuid_generate_v4(), -- Cart ID
    (SELECT id FROM users WHERE name = 'John Doe'), -- John Doe's user_id
    current_date, -- Created_at
    current_date, -- Updated_at
    'OPEN' -- Status (Assumed cart_status value)
);

*/

/*
-- Insert items into the cart for 'John Doe'
INSERT INTO cart_item (cart_id, product_id, count)
VALUES
    ((SELECT id FROM cart WHERE user_id = (SELECT id FROM users WHERE name = 'John Doe')), 'e590d5c5-68d1-4f29-bd95-5e351f991212', 2),
    ((SELECT id FROM cart WHERE user_id = (SELECT id FROM users WHERE name = 'John Doe')), '6f3d22aa-b8a3-4b5a-85c6-9a11bfb6e777', 1),
    ((SELECT id FROM cart WHERE user_id = (SELECT id FROM users WHERE name = 'John Doe')), '1b9e1a4b-52da-4ff6-a06f-35597c38a2f1', 7);
*/

/*
-- Insert a new order for 'John Doe'
INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total)
VALUES (
    uuid_generate_v4(), -- Order ID
    (SELECT id FROM users WHERE name = 'John Doe'), -- John Doe's user_id
    (SELECT id FROM cart WHERE user_id = (SELECT id FROM users WHERE name = 'John Doe')), -- Cart ID
    '{"type": "credit card", "address": null, "creditCard": null}', -- Payment details
    '{"type": "standard", "address": "123 Main St"}', -- Delivery details
    'Order for John Doe', -- Comments
    'ORDERED', -- Status
    150.0 -- Total amount
);
*/


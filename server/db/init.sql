-- ============
-- CMD CREATION
-- ============

-- Create the database
CREATE DATABASE frostbites;

-- Enable the uuid-ossp extension to generate UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the tables
CREATE TABLE users (
   user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_name VARCHAR(100) NOT NULL,
   user_email VARCHAR(255) NOT NULL,
   user_password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
   role_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE user_roles (
   user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
   role_id uuid REFERENCES roles(role_id) ON DELETE CASCADE,
   PRIMARY KEY (user_id, role_id)
);

CREATE TABLE products (
   product_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   product_img VARCHAR(100) NOT NULL,
   product_name VARCHAR(100) NOT NULL,
   product_price DECIMAL(10, 2) NOT NULL
);
 
-- ============
-- DATA EXAMPLE
-- ============
 
INSERT INTO users (user_name, user_email, user_password)
VALUES 
   ('Alice', 'alice21@example.com', 'securepassword1');

INSERT INTO roles (role_name) 
VALUES 
   ('admin'), 
   ('user');

INSERT INTO user_roles (user_id, role_id)
VALUES
   ((SELECT user_id FROM users WHERE user_name = 'Alice'), (SELECT role_id FROM roles WHERE role_name = 'admin')),
   ((SELECT user_id FROM users WHERE user_name = 'Alice'), (SELECT role_id FROM roles WHERE role_name = 'user'));

INSERT INTO products (product_img, product_name, product_price)
VALUES
   ('https://picsum.photos/200/200', 'strawberry', '15.99'),
   ('https://picsum.photos/200/200', 'chocolate', '12.99');

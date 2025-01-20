CREATE DATABASE frostbites;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
   user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_name VARCHAR(100) NOT NULL,
   user_email VARCHAR(255) NOT NULL,
   user_password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   is_verified BOOLEAN DEFAULT FALSE
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

CREATE TABLE orders (
   order_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
   product_id uuid REFERENCES products(product_id) ON DELETE CASCADE,   
   product_name VARCHAR(100),
   product_price DECIMAL(10, 2),
   quantity INT,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

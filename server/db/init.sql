CREATE DATABASE frostbites;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
   user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_name VARCHAR(100) NOT NULL,
   user_email VARCHAR(255) NOT NULL,
   user_password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   is_verified BOOLEAN DEFAULT FALSE,
   user_bio VARCHAR(255) NOT NULL DEFAULT 'No bio provided';
);

CREATE TABLE roles (
   role_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE user_roles (
   user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
   role_id UUID REFERENCES roles(role_id) ON DELETE CASCADE,
   PRIMARY KEY (user_id, role_id)
);

CREATE TABLE products (
   product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   product_img VARCHAR(100) NOT NULL,
   product_name VARCHAR(100) NOT NULL,
   product_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders (
   order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
   product_id UUID REFERENCES products(product_id) ON DELETE CASCADE,   
   product_name VARCHAR(100),
   product_price DECIMAL(10, 2),
   quantity INT DEFAULT 0,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   session_id VARCHAR(100) NOT NULL,
   customer_email VARCHAR(255) NOT NULL,
   amount DECIMAL(10, 2) NOT NULL,
   payment_status VARCHAR(50) NOT NULL, 
   status VARCHAR(50) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);


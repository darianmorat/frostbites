-- SETUP DATABASE
CREATE DATABASE frostbites;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE TABLES
CREATE TABLE users (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   name VARCHAR(100) NOT NULL,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255),
   bio TEXT DEFAULT 'No bio provided',
   phone VARCHAR(30) DEFAULT 'No phone provided',
   address TEXT DEFAULT 'No address provided',
   profile_picture VARCHAR(255) DEFAULT 'default_profile.jpg',
   profile_banner VARCHAR(255) DEFAULT 'default_banner.jpg',
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   is_verified BOOLEAN DEFAULT FALSE,
   auth_provider VARCHAR(50) DEFAULT 'email'
);

CREATE TABLE roles (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   role VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE user_roles (
   user_id UUID REFERENCES users(id) ON DELETE CASCADE,
   role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
   PRIMARY KEY (user_id, role_id)
);

CREATE TABLE products (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   url VARCHAR(100) NOT NULL,
   name VARCHAR(100) NOT NULL,
   price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   user_id UUID REFERENCES users(id) ON DELETE CASCADE,
   product_id UUID REFERENCES products(id) ON DELETE CASCADE,   
   product_name VARCHAR(100),
   product_price DECIMAL(10, 2),
   quantity INT DEFAULT 0,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
   session_id VARCHAR(100) NOT NULL,
   customer_id VARCHAR(255) NOT NULL,
   customer_email VARCHAR(255) NOT NULL,
   amount DECIMAL(10, 2) NOT NULL,
   payment_status VARCHAR(50) NOT NULL, 
   status VARCHAR(50) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- INSERT DATA
INSERT INTO roles (role) VALUES ('admin'), ('user');

INSERT INTO products (url, name, price) VALUES
('https://i.ibb.co/BNtgDCG/chocolate.png', 'Chocolate', 4.99),
('https://i.ibb.co/1mGkDJg/bubblegum.png', 'Bubblegum', 3.99),
('https://i.ibb.co/3W7ztyW/banana.png', 'Banana', 4.29),
('https://i.ibb.co/C8hgTtX/mixberry.png', 'Mix Berry', 5.99),
('https://i.ibb.co/2yFXtbY/blueberry.png', 'Blueberry', 1.99),
('https://i.ibb.co/gFtc1w4/lemon.png', 'Lemon', 2.99),
('https://i.ibb.co/BNtgDCG/chocolate.png', 'Example1', 2.00),
('https://i.ibb.co/BNtgDCG/chocolate.png', 'Example2', 4.00);

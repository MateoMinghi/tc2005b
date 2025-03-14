-- Create database
CREATE DATABASE IF NOT EXISTS supplier_discovery;
USE supplier_discovery;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Suppliers table
CREATE TABLE suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  website VARCHAR(255),
  category_id INT NOT NULL,
  description TEXT,
  logo_url VARCHAR(255),
  founding_year INT,
  employee_count INT,
  average_rating DECIMAL(2,1) DEFAULT 0.0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Reviews table
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  supplier_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY (supplier_id, user_id)
);


USE supplier_discovery;

-- Insert sample data into users table
-- password123 para user y securepass para admin
INSERT INTO users (username, email, password, role) VALUES
('john_doe', 'john.doe@example.com', '$2b$10$3Z8o4oVdH9u6nagCzABczu5fkgw/.DiQAZ3L.xOH7SiEoedTYFNTy', 'user'),
('jane_smith', 'jane.smith@example.com', '$2b$10$qROtQOmCYZcmzACfTaW6/e2Xe8BooWUVV92HquGrbtTOKImGsg842', 'admin'),
('peter_jones', 'peter.jones@example.com', '$2b$10$3Z8o4oVdH9u6nagCzABczu5fkgw/.DiQAZ3L.xOH7SiEoedTYFNTy', 'user');

-- Insert sample data into categories table
INSERT INTO categories (name, description) VALUES
('Electronics', 'Suppliers of electronic components and devices'),
('Clothing', 'Apparel and fashion product suppliers'),
('Food & Beverage', 'Food and drink suppliers'),
('Construction', 'Construction materials and equipment'),
('Services', 'Business and IT services');

-- Insert sample data into suppliers table
INSERT INTO suppliers (name, address, city, state, postal_code, country, phone, email, website, category_id, description, logo_url, founding_year, employee_count, created_by) VALUES
('Acme Electronics', '123 Main St', 'Anytown', 'CA', '91234', 'USA', '555-123-4567', 'info@acme.com', 'www.acme.com', 1, 'A leading supplier of electronic components', 'acme_logo.png', 1985, 500, 2),
('Global Clothing Co', '456 Elm St', 'Springfield', 'IL', '62704', 'USA', '555-987-6543', 'sales@globalclothing.com', 'www.globalclothing.com', 2, 'A global provider of clothing and apparel', 'global_clothing_logo.png', 2000, 1500, 1),
('Fresh Foods Inc', '789 Oak St', 'Lakewood', 'NJ', '08701', 'USA', '555-222-3333', 'contact@freshfoods.com', 'www.freshfoods.com', 3, 'A supplier of fresh and organic food products', 'fresh_foods_logo.png', 2010, 300, 2),
('BuildTech Solutions', '101 Pine St', 'Portland', 'OR', '97204', 'USA', '555-444-5555', 'info@buildtech.com', 'www.buildtech.com', 4, 'Supplier of construction materials and equipment', 'buildtech_logo.png', 1995, 800, 1),
('Tech Services Ltd', '222 Cedar St', 'Seattle', 'WA', '98101', 'USA', '555-777-8888', 'support@techservices.com', 'www.techservices.com', 5, 'Provides IT and business services', 'tech_services_logo.png', 2005, 200, 3);

-- Insert sample data into reviews table
INSERT INTO reviews (supplier_id, user_id, rating, comment) VALUES
(1, 1, 4, 'Good quality components and fast delivery.'),
(1, 2, 5, 'Excellent service and support.'),
(2, 3, 3, 'Decent clothing, but shipping was slow.'),
(3, 1, 4, 'Great organic food selection.'),
(4, 2, 5, 'Reliable construction materials.');


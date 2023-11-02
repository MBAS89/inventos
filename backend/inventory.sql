-- Create Categories Table
CREATE TABLE categories (
    category_id BIGSERIAL PRIMARY KEY,
    image TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dagzd3ntq/image/upload/v1705620919/trp6vagjxvf5co3hdwlv.png',
    image_id TEXT NOT NULL DEFAULT 'trp6vagjxvf5co3hdwlv',
    name VARCHAR(255) NOT NULL UNIQUE,
    store_id INT REFERENCES stores(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT current_timestamp
);

-- Create Brands Table
CREATE TABLE brands (
    brand_id BIGSERIAL PRIMARY KEY,
    image TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dagzd3ntq/image/upload/v1705620919/d67opvq7mqx2i5qqcn5f.png',
    image_id TEXT NOT NULL DEFAULT 'd67opvq7mqx2i5qqcn5f',
    name VARCHAR(255) NOT NULL UNIQUE,
    store_id INT REFERENCES stores(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT current_timestamp
);


-- Create Products Table
CREATE TABLE products (
    product_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    image TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dagzd3ntq/image/upload/v1705621314/fekyljmwjkrvrauqbrgh.png',
    image_id TEXT NOT NULL DEFAULT 'fekyljmwjkrvrauqbrgh',
    sku TEXT NOT NULL,
    price DECIMAL NOT NULL,
    retail_price DECIMAL NOT NULL,
    wholesale_price DECIMAL NOT NULL,
    sale_price DECIMAL,
    on_sale BOOLEAN DEFAULT false,
    qty INT NOT NULL,
    description TEXT,
    category_id INT REFERENCES categories(category_id),
    brand_id INT REFERENCES brands(brand_id),
    store_id INT REFERENCES stores(id)
);
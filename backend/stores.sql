CREATE TABLE stores ( 
    id BIGSERIAL PRIMARY KEY,
    store_name       VARCHAR(50) UNIQUE NOT NULL,
    owner_first_name VARCHAR(50) NOT NULL,
    owner_last_name  VARCHAR(50) NOT NULL,
    owner_email      VARCHAR(100) NOT NULL,
    PASSWORD         VARCHAR(255) NOT NULL, 
    phone_number     VARCHAR(20) NOT NULL,
    created_at       TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at       TIMESTAMPTZ DEFAULT current_timestamp,
    store_image_url VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dagzd3ntq/image/upload/v1705500104/otrhxsof3dk0ahtnth0x.png'
);


CREATE TABLE owners ( 
    id BIGSERIAL PRIMARY KEY, 
    store_id INT REFERENCES stores(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE admins ( 
    id BIGSERIAL PRIMARY KEY, 
    store_id   INT REFERENCES stores(id) ON DELETE CASCADE,
    first_name VARCHAR(50) NOT NULL, 
    last_name  VARCHAR(50) NOT NULL, 
    email      VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    PASSWORD   VARCHAR(255) NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ DEFAULT current_timestamp
);

CREATE TABLE owner_stores ( 
    owner_id BIGINT REFERENCES owners(id) ON DELETE CASCADE,
    store_id BIGINT REFERENCES stores(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ DEFAULT current_timestamp
);
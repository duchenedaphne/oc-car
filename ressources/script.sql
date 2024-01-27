
CREATE DATABASE cardb;

USE cardb;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(40) NOT NULL,
    firstname VARCHAR(40) NOT NULL,
    date_of_birth TIMESTAMP NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE messages(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    object VARCHAR(40) NOT NULL,
    content VARCHAR(255) NOT NULL,
    sender INT NOT NULL,
    recipient INT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (sender) REFERENCES users(id),
    FOREIGN KEY (recipient) REFERENCES users(id)
);

CREATE TABLE chat_messages(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    sender INT NOT NULL,
    recipient INT NOT NULL,
    is_read INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (sender) REFERENCES users(id),
    FOREIGN KEY (recipient) REFERENCES users(id)
);

CREATE TABLE agencies(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE rent_offers(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    car_category VARCHAR(40) NOT NULL,
    from_location VARCHAR(255) NOT NULL,
    to_location VARCHAR(255) NOT NULL,
    from_date_time TIMESTAMP NOT NULL,
    to_date_time TIMESTAMP NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    agency INT NOT NULL,
    booked BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (agency) REFERENCES agencies(id)
);

CREATE TABLE bookings(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    rent INT NOT NULL,
    renter INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (rent) REFERENCES rent_offers(id),
    FOREIGN KEY (renter) REFERENCES users(id)
);

INSERT INTO users (lastname, firstname, date_of_birth, address, email, password)
VALUES ('One', 'Client', '2003-01-01', 'adresse', 'client@mail.com', 'password');


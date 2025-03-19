CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE pets (
    id UUID DEFAULT get_random_uuid() PRIMARY KEY,
    description TEXT,
    image VARCHAR(100) NOT NULL,
    status VARCHAR(16) NOT NULL,
    type VARCHAR(5) NOT NULL,
    color VARCHAR(20),
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6)
    date TIMESTAMP NOT NULL,
    CONSTRAINT status_check CHECK (status in ('PROCESSED', 'PROCESSING', 'UNAVAILABLE')),
    CONSTRAINT type_check CHECK (type in ('CAT', 'DOG', 'OTHER'))
);
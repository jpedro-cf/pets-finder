CREATE TABLE users (
    id UUID DEFAULT get_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(5) DEFAULT "USER" NOT NULL,
    number VARCHAR(16) UNIQUE,
    CONSTRAINT role_check CHECK (role in ('ADMIN', 'USER'))
);
CREATE INDEX email_idx ON users(email);

ALTER TABLE pets
ADD COLUMN user_id UUID NOT NULL,
ADD CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id);

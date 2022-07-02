`
CREATE TABLE IF NOT EXISTS users(
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255),
    password varchar(255),
    created_at DATETIME NOT NULL DEFAULT (UTC_TIMESTAMP),
	updated_at DATETIME NOT NULL DEFAULT (UTC_TIMESTAMP) ON UPDATE UTC_TIMESTAMP,
	PRIMARY KEY (id)
);


`
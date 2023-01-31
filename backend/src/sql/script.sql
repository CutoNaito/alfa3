SET @@AUTOCOMMIT=0;

CREATE DATABASE obchod;
USE obchod;

CREATE TABLE zakaznik(
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`surname` VARCHAR(20) NOT NULL,
	`first_name` VARCHAR(20) NOT NULL,
	`phone_number` INT NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	`country` VARCHAR(100) NOT NULL
);

CREATE TABLE zamestnanec(
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`surname` VARCHAR(20) NOT NULL,
	`first_name` VARCHAR(20) NOT NULL,
	`phone_number` INT NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	`country` VARCHAR(100) NOT NULL
);

CREATE TABLE produkt(
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	`name` VARCHAR(50) NOT NULL,
	`price` FLOAT NOT NULL,
	`size` ENUM('XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL') 
);

CREATE TABLE objednavka(
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`id_zak` INT NOT NULL,
	`id_zam` INT NOT NULL,
	`id_prod` INT NOT NULL,
	CONSTRAINT `id_zak_constr` FOREIGN KEY (id_zak) REFERENCES zakaznik(id),
	CONSTRAINT `id_zam_constr` FOREIGN KEY (id_zam) REFERENCES zamestnanec(id),
	CONSTRAINT `id_prod_constr` FOREIGN KEY (id_prod) REFERENCES produkt(id),
	`datum_vytvoreni` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`isPaid` BOOL NOT NULL
);

CREATE TABLE feedback(
	`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,	
	`id_zak` INT NOT NULL,
	`id_prod` INT NOT NULL,
	CONSTRAINT `id_zak_const` FOREIGN KEY (id_zak) REFERENCES zakaznik(id),
	CONSTRAINT `id_prod_const` FOREIGN KEY (id_prod) REFERENCES produkt(id),
	`title` VARCHAR(100) NOT NULL,
	`text` VARCHAR(1000) NOT NULL
);
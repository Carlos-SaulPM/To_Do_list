SET NAMES 'UTF8MB4';
DROP DATABASE IF EXISTS dbTareas;
CREATE DATABASE IF NOT EXISTS dbTareas DEFAULT CHARACTER SET UTF8MB4;
USE dbTareas;

CREATE TABLE usuario(
id_uso				INT NOT NULL AUTO_INCREMENT,
correo				VARCHAR(30) NOT NULL UNIQUE,
password			VARCHAR(20) NOT NULL,
nombre				VARCHAR(30) NOT NULL,
apellido_paterno	VARCHAR(30) NOT NULL,
apellido_materno	VARCHAR(30) NOT NULL,
fecha_nacimiento	DATE NOT NULL,
PRIMARY KEY(id_uso)
);

CREATE TABLE tarea(
id_tra		INT NOT NULL AUTO_INCREMENT,
id_uso		INT NOT NULL,
titulo		VARCHAR(50) NOT NULL,
descripcion	VARCHAR(255) NOT NULL,
estaActivo	BIT(1) DEFAULT 1,
PRIMARY KEY (id_tra),
CONSTRAINT fk_tarea_usuario FOREIGN KEY(id_uso) REFERENCES usuario(id_uso) 
);

CREATE TABLE comentario(
id_cmto		INT NOT NULL AUTO_INCREMENT,
id_tra		INT NOT NULL,
comentario	VARCHAR(255) NOT NULL,
fecha		DATE NOT NULL,
PRIMARY KEY (id_cmto),
CONSTRAINT fk_comentario_tarea FOREIGN KEY(id_tra) REFERENCES tarea(id_tra) 
);


CREATE TABLE estado(
id_edo				INT NOT NULL AUTO_INCREMENT,
id_tra				INT NOT NULL,
fecha_actualizacion	DATETIME NOT NULL,
estado				BOOLEAN DEFAULT FALSE,
PRIMARY KEY (id_edo),
CONSTRAINT fk_estado_tarea FOREIGN KEY(id_tra) REFERENCES tarea(id_tra) 
);

DELIMITER //

CREATE TRIGGER estado_inicial_tarea
AFTER INSERT ON tarea
FOR EACH ROW
BEGIN
	INSERT INTO estado(id_tra, fecha_actualizacion) VALUE(NEW.id_tra, NOW());
END//

CREATE TRIGGER estado_tarea_eliminada
AFTER UPDATE ON tarea
FOR EACH ROW
BEGIN
	IF NEW.estaActivo = 0 THEN
		INSERT INTO estado(id_tra, fecha_actualizacion, estado) VALUE(NEW.id_tra, NOW(), TRUE);
	END IF;
END//

DELIMITER ;
DROP DATABASE IF EXISTS cine;
CREATE DATABASE IF NOT EXISTS cine
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;
USE cine;

SET NAMES 'utf8mb4';
CREATE TABLE `CINES` (
  `id_cine` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre_cine` VARCHAR(50),
  `codigo_postal` VARCHAR(5) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `SALAS` (
  `id_sala` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_cine` INT,
  `numero_sala` VARCHAR(3)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `ASIENTOS` (
  `id_asiento` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fila_columna` VARCHAR(3),
  `id_sala` INT
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `USUARIOS` (
  `id_usuario` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  `primer_apellido` VARCHAR(50),
  `segundo_apellido` VARCHAR(50),
  `fecha_nacimiento` DATE,
  `sexo` ENUM('HOMBRE', 'MUJER', 'PREFIERO NO RESPONDER'),
  `codigo_postal` VARCHAR(5) NOT NULL,
  `numero_telefono` VARCHAR(10) NOT NULL,
  `correo` VARCHAR(255) UNIQUE,
  `contrasena` VARCHAR(255)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `MEMBRESIAS` (
  `id_membresia` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `CLIENTES` (
  `id_cliente` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_usuario` INT UNIQUE,
  `puntos` INT,
  `id_membresia` INT,
  `activo` TINYINT(1)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `RESERVA` (
  `id_reserva` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_asiento` INT,
  `id_cliente` INT,
  `fecha` DATETIME
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `PELICULAS` (
  `id_pelicula` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  `url_portada` VARCHAR(1000),
  `duracion` VARCHAR(4),
  `director` VARCHAR(50),
  `url_trailer` VARCHAR(1000),
  `genero` ENUM('DRAMA', 'CIENCIA FICCION', 'ROMANCE', 'COMEDIA'),
  `estado_cartelera` ENUM('PRÓXIMAMENTE', 'ESTRENO', 'CARTELERA'),
  `fecha_inicio_estreno` DATETIME,
  `fecha_fin_estreno` DATETIME,
  `activo` TINYINT(1)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `FUNCIONES` (
  `id_funcion` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_sala` INT,
  `id_pelicula` INT,
  `fecha_hora` DATETIME,
  `precio` DECIMAL(10,2)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `VENTAS` (
  `id_venta` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_cliente` INT,
  `fecha_hora` DATETIME,
  `total` DECIMAL(10,2)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `CATEGORIA_DULCERIA` (
  `id_categoria_dulceria` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `DULCERIA` (
  `id_dulce` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  `tamano` VARCHAR(500),
  `tipo` ENUM('VIP', 'TRADICIONAL'),
  `id_categoria_dulceria` INT,
  `precio` DECIMAL(10,2)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `STOCK_DULCERIA_CINES` (
  `id_stock_dulceria` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_cine` INT NOT NULL,
  `id_dulce` INT NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `EMPLEADOS` (
  `id_empleado` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_usuario` INT UNIQUE,
  `fecha_contratacion` DATE,
  `activo` TINYINT(1),
  `rol` ENUM('admin', 'editor', 'visualizador')
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `DETALLE_VENTA` (
  `id_detalle_venta` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_venta` INT,
  `cantidad` INT,
  `precio` DECIMAL(10,2),
  `id_funcion` INT,
  `id_asiento` INT,
  `id_dulce` INT,
  `tipo_item` ENUM('FUNCION', 'DULCE'),
  `subtotal` DECIMAL(10,2)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE `HISTORIAL` (
  `id_historial` INT AUTO_INCREMENT PRIMARY KEY,
  `id_usuario` INT,
  `fecha_hora` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` VARCHAR(45) DEFAULT NULL,
  `tipo_movimiento` VARCHAR(100) NOT NULL,
  `descripcion` TEXT DEFAULT NULL,
  `tabla_afectada` VARCHAR(100) DEFAULT NULL,
  `id_registro_afectado` INT DEFAULT NULL,
  `exito` BOOLEAN DEFAULT TRUE,
  `origen` VARCHAR(50) DEFAULT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE UNIQUE INDEX `ASIENTOS_index_0` ON `ASIENTOS` (`id_sala`, `fila_columna`);
CREATE UNIQUE INDEX `RESERVA_index_1` ON `RESERVA` (`id_asiento`, `fecha`);

ALTER TABLE `SALAS` ADD FOREIGN KEY (`id_cine`) REFERENCES `CINES` (`id_cine`);
ALTER TABLE `ASIENTOS` ADD FOREIGN KEY (`id_sala`) REFERENCES `SALAS` (`id_sala`);
ALTER TABLE `CLIENTES` ADD FOREIGN KEY (`id_usuario`) REFERENCES `USUARIOS` (`id_usuario`);
ALTER TABLE `CLIENTES` ADD FOREIGN KEY (`id_membresia`) REFERENCES `MEMBRESIAS` (`id_membresia`);
ALTER TABLE `RESERVA` ADD FOREIGN KEY (`id_asiento`) REFERENCES `ASIENTOS` (`id_asiento`);
ALTER TABLE `RESERVA` ADD FOREIGN KEY (`id_cliente`) REFERENCES `CLIENTES` (`id_cliente`);
ALTER TABLE `FUNCIONES` ADD FOREIGN KEY (`id_pelicula`) REFERENCES `PELICULAS` (`id_pelicula`);
ALTER TABLE `FUNCIONES` ADD FOREIGN KEY (`id_sala`) REFERENCES `SALAS` (`id_sala`);
ALTER TABLE `VENTAS` ADD FOREIGN KEY (`id_cliente`) REFERENCES `CLIENTES` (`id_cliente`);
ALTER TABLE `DULCERIA` ADD FOREIGN KEY (`id_categoria_dulceria`) REFERENCES `CATEGORIA_DULCERIA` (`id_categoria_dulceria`);
ALTER TABLE `EMPLEADOS` ADD FOREIGN KEY (`id_usuario`) REFERENCES `USUARIOS` (`id_usuario`);
ALTER TABLE `DETALLE_VENTA` ADD FOREIGN KEY (`id_dulce`) REFERENCES `DULCERIA` (`id_dulce`);
ALTER TABLE `DETALLE_VENTA` ADD FOREIGN KEY (`id_funcion`) REFERENCES `FUNCIONES` (`id_funcion`);
ALTER TABLE `DETALLE_VENTA` ADD FOREIGN KEY (`id_venta`) REFERENCES `VENTAS` (`id_venta`);
ALTER TABLE `DETALLE_VENTA` ADD FOREIGN KEY (`id_asiento`) REFERENCES `ASIENTOS` (`id_asiento`);
ALTER TABLE `STOCK_DULCERIA_CINES` ADD FOREIGN KEY (`id_dulce`) REFERENCES `DULCERIA` (`id_dulce`);
ALTER TABLE `STOCK_DULCERIA_CINES` ADD FOREIGN KEY (`id_cine`) REFERENCES `CINES` (`id_cine`);
ALTER TABLE `HISTORIAL` ADD FOREIGN KEY (`id_usuario`) REFERENCES `USUARIOS`(`id_usuario`)
ON DELETE SET NULL ON UPDATE CASCADE;



INSERT INTO `MEMBRESIAS` (`nombre`) VALUES
('FAN'),
('FANÁTICO'),
('SUPER FANÁTICO');

INSERT INTO `CATEGORIA_DULCERIA` (`nombre`) VALUES 
('PROMOCIONALES'),
('NUEVOS LANZAMIENTOS'),
('CLÁSICOS'),
('SNACKS'),
('PARA COMPARTIR'),
('COMBOS'),
('HELADOS'),
('DULCES Y CHOCOLATES');

INSERT INTO `CINES` (`nombre_cine`, `codigo_postal`) VALUES 
('San Fernando Colima','28010'),
('Zentralia Colima','28018'),
('Galerías Guadalajara','41538'),
('Andares Guadalajara','45116');

INSERT INTO `USUARIOS` (`nombre`, `primer_apellido`, `segundo_apellido`, `fecha_nacimiento`, `sexo`, `codigo_postal`, `numero_telefono`, `correo`, `contrasena`) VALUES 
('Sergio Sebastian', 'Velasco', 'Torres', '2005-02-15', 'HOMBRE', '28078', '3125949425', 'svelasco13@ucol.mx', 'VALsebs21');
CREATE TABLE `cines` (
  `id_cine` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre_cine` VARCHAR(50),
  `codigo_postal` VARCHAR(5) NOT NULL
);

CREATE TABLE `salas` (
  `id_sala` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_cine` INT,
  `numero_sala` VARCHAR(3)
);

CREATE TABLE `asientos` (
  `id_asiento` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fila_columna` VARCHAR(3),
  `id_sala` INT
);

CREATE TABLE `usuarios` (
  `id_usuario` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255)   NOT NULL,
  `primer_apellido` VARCHAR(50) NOT NULL,
  `segundo_apellido` VARCHAR(50) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `sexo` ENUM ('HOMBRE', 'MUJER', 'PREFIERO NO RESPONDER') NOT NULL,
  `codigo_postal` VARCHAR(5) NOT NULL,
  `numero_telefono` VARCHAR(10) UNIQUE NOT NULL,
  `correo` VARCHAR(255) UNIQUE NOT NULL,
  `contrasena` VARCHAR(255) NOT NULL
);

CREATE TABLE `membresias` (
  `id_membresia` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255)
);

CREATE TABLE `clientes` (
  `id_cliente` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_usuario` INT UNIQUE,
  `puntos` INT,
  `id_membresia` INT,
  `activo` TINYINT(1)
);

CREATE TABLE `reserva` (
  `id_reserva` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_asiento` INT,
  `id_cliente` INT,
  `fecha` DATETIME
);

CREATE TABLE `peliculas` (
  `id_pelicula` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  `url_portada` VARCHAR(1000),
  `duracion` VARCHAR(4),
  `director` VARCHAR(50),
  `url_trailer` VARCHAR(1000),
  `genero` ENUM ('DRAMA', 'CIENCIA FICCION', 'ROMANCE', 'COMEDIA'),
  `estado_cartelera` ENUM ('PROXIMAMENTE', 'ESTRENO', 'CARTELERA'),
  `fecha_inicio_estreno` DATETIME,
  `fecha_fin_estreno` DATETIME,
  `activo` TINYINT(1)
);

CREATE TABLE `funciones` (
  `id_funcion` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_sala` INT,
  `id_pelicula` INT,
  `fecha_hora` DATETIME,
  `precio` DECIMAL(10,2)
);

CREATE TABLE `ventas` (
  `id_venta` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_cliente` INT,
  `fecha_hora` DATETIME,
  `total` DECIMAL(10,2)
);

CREATE TABLE `categoria_dulceria` (
  `id_categoria_dulceria` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255)
);

CREATE TABLE `dulceria` (
  `id_dulce` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255),
  `tamano` VARCHAR(500),
  `tipo` ENUM ('VIP', 'TRADICIONAL'),
  `id_categoria_dulceria` INT,
  `precio` DECIMAL(10,2)
);
CREATE TABLE `stock_dulceria_cines` (
      `id_stock_dulceria` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
      `id_cine` INT NOT NULL,
      `id_dulce` INT NOT NULL
      
);
CREATE TABLE `empleados` (
  `id_empleado` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_usuario` INT UNIQUE,
  `fecha_contratacion` DATE,
  `activo` TINYINT(1),
  `rol` ENUM ('admin', 'editor', 'visualizador')
);

CREATE TABLE `detalle_venta` (
  `id_detalle_venta` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_venta` INT,
  `cantidad` INT,
  `precio` DECIMAL(10,2),
  `id_funcion` INT,
  `id_asiento` INT,
  `id_dulce` INT,
  `tipo_item` ENUM ('FUNCION', 'DULCE'),
  `subtotal` DECIMAL(10,2)
);
CREATE TABLE historial (
  id_historial INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT,             -- Nombre o ID del usuario que realizó la acción
  fecha_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- Momento exacto del evento
  ip VARCHAR(45) DEFAULT NULL,               -- IPv4 o IPv6 del cliente
  tipo_movimiento VARCHAR(100) NOT NULL,     -- Tipo de acción (INSERT, UPDATE, DELETE, LOGIN, LOGOUT, etc.)
  descripcion TEXT DEFAULT NULL,             -- Descripción más detallada de lo ocurrido
  tabla_afectada VARCHAR(100) DEFAULT NULL,  -- Nombre de la tabla involucrada
  id_registro_afectado INT DEFAULT NULL,     -- ID del registro afectado (si aplica)
  exito BOOLEAN DEFAULT TRUE,                -- Si la operación fue exitosa o falló
  origen VARCHAR(50) DEFAULT NULL           -- Indica desde dónde se realizó (web, API, app, admin, etc.)
  
);

CREATE UNIQUE INDEX `asientos_index_0` ON `asientos` (`id_sala`, `fila_columna`);

CREATE UNIQUE INDEX `reserva_index_1` ON `reserva` (`id_asiento`, `fecha`);

ALTER TABLE `salas` ADD FOREIGN KEY (`id_cine`) REFERENCES `cines` (`id_cine`);

ALTER TABLE `asientos` ADD FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id_sala`);

ALTER TABLE `clientes` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `clientes` ADD FOREIGN KEY (`id_membresia`) REFERENCES `membresias` (`id_membresia`);

ALTER TABLE `reserva` ADD FOREIGN KEY (`id_asiento`) REFERENCES `asientos` (`id_asiento`);

ALTER TABLE `reserva` ADD FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`);

ALTER TABLE `funciones` ADD FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id_pelicula`);

ALTER TABLE `funciones` ADD FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id_sala`);

ALTER TABLE `ventas` ADD FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`);

ALTER TABLE `dulceria` ADD FOREIGN KEY (`id_categoria_dulceria`) REFERENCES `categoria_dulceria` (`id_categoria_dulceria`);

ALTER TABLE `empleados` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

ALTER TABLE `detalle_venta` ADD FOREIGN KEY (`id_dulce`) REFERENCES `dulceria` (`id_dulce`);

ALTER TABLE `detalle_venta` ADD FOREIGN KEY (`id_funcion`) REFERENCES `funciones` (`id_funcion`);

ALTER TABLE `detalle_venta` ADD FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`);

ALTER TABLE `detalle_venta` ADD FOREIGN KEY (`id_asiento`) REFERENCES `asientos` (`id_asiento`);

ALTER TABLE `stock_dulceria_cines`ADD FOREIGN KEY (`id_dulce`) REFERENCES `dulceria` (`id_dulce`);

ALTER TABLE `stock_dulceria_cines`ADD FOREIGN KEY (`id_cine`) REFERENCES `cines` (`id_cine`);

ALTER TABLE `historial`
ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`)
ON DELETE SET NULL
ON UPDATE CASCADE;

ALTER TABLE `salas`
ADD UNIQUE KEY `unique_sala` (`id_cine`, `numero_sala`);

ALTER TABLE `asientos`
ADD UNIQUE KEY `unique_asiento` (`fila_columna`,`id_sala`);

ALTER TABLE `funciones`
ADD UNIQUE KEY `unique_funcion` (`id_pelicula`, `id_sala`, `fecha_hora`);
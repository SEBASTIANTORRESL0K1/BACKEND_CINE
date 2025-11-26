-- CORRECCIÓN: Los nombres de las tablas y columnas ahora coinciden con el esquema en minúsculas (ej: `membresias` en lugar de `MEMBRESIAS`).

-- MEMBRESIAS
INSERT INTO `membresias` (`nombre`) VALUES ('FAN');
INSERT INTO `membresias` (`nombre`) VALUES ('FANATICO');
INSERT INTO `membresias` (`nombre`) VALUES ('SUPER FANATICO');

-- CATEGORIAS DULCERIA
INSERT INTO `categoria_dulceria` (`nombre`) VALUES ('PROMOCIONALES');
INSERT INTO `categoria_dulceria` (`nombre`) VALUES ('COMBOS');
INSERT INTO `categoria_dulceria` (`nombre`) VALUES ('NUEVOS LANZAMIENTOS');
INSERT INTO `categoria_dulceria` (`nombre`) VALUES ('CLASICOS');
INSERT INTO `categoria_dulceria` (`nombre`) VALUES ('SNACKS');
INSERT INTO `categoria_dulceria` (`nombre`) VALUES ('PROMOCIONES');
INSERT INTO `categoria_dulceria` (`nombre`) VALUES ('PARA COMPARTIR');
INSERT INTO `categoria_dulceria` (`nombre`) VALUES ('HELADOS');
INSERT INTO `categoria_dulceria` (`nombre`) VALUES ('DULCES Y CHOCOLATES');

-- DULCERIA - PROMOCIONALES
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('PALOMITAS LILO & STITCH', 'GRANDE', 'VIP', 1, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('PALOMERO TELEFONO NEGRO CON PALOMITAS', 'GRANDE', 'VIP', 1, 455.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('VASO VOLVER AL FUTURO CON BEBIDA', 'GRANDE', 'VIP', 1, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('VASO TRON CON BEBIDA', 'GRANDE', 'VIP', 1, 245.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('VASO PROMOCIONAL WICKED 2D', 'MEDIANO', 'VIP', 1, 35.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('VASO LA CASA DE MUNECAS DE GABBY CON BEBIDA', 'GRANDE', 'VIP', 1, 99.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('VASO PROMOCIONAL WICKED 3D', 'GRANDE', 'VIP', 1, 250.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('VASO 4 FANTASTICOS CON BEBIDA', 'GRANDE', 'VIP', 1, 0.00);

-- DULCERIA - COMBOS
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('COMBO NACHOS EN PAREJA', 'GRANDE', 'TRADICIONAL', 2, 334.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('COMBO ICEE CON SKWINKLES', 'MEDIANO', 'TRADICIONAL', 2, 325.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('COMBO CLASICO', 'MEDIANO', 'TRADICIONAL', 2, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('COMBO CIEL', 'MEDIANO', 'TRADICIONAL', 2, 176.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('COMBO NACHOS', 'MEDIANO', 'TRADICIONAL', 2, 256.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('COMBO JUNIOR', 'PEQUENO', 'TRADICIONAL', 2, 235.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('COMBO CORNETTO', 'MEDIANO', 'TRADICIONAL', 2, 224.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('COMBO MAGNUM', 'MEDIANO', 'TRADICIONAL', 2, 239.00);

-- DULCERIA - NUEVOS LANZAMIENTOS
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('SALSAS', 'PEQUENO', 'TRADICIONAL', 3, 15.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('HOT DOG JALAPENO', 'MEDIANO', 'TRADICIONAL', 3, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('PALOMITAS COLMILLO', 'GRANDE', 'TRADICIONAL', 3, 99.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('PALOMITAS SKWINKLES', 'GRANDE', 'TRADICIONAL', 3, 173.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('COMBO NACHOS EN PAREJA PALOMITAS SKWINKLES', 'GRANDE', 'TRADICIONAL', 3, 383.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('COMBO CUATES PALOMITAS SKWINKLES', 'GRANDE', 'TRADICIONAL', 3, 315.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('COMBO ICEE PALOMITAS SKWINKLES', 'GRANDE', 'TRADICIONAL', 3, 375.00);

-- DULCERIA - CLASICOS
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('PALOMITAS', 'GRANDE', 'TRADICIONAL', 4, 96.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('VALLE FRUT REFRESCO', 'MEDIANO', 'TRADICIONAL', 4, 85.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('NACHOS', 'MEDIANO', 'TRADICIONAL', 4, 90.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('HOT DOG INDIVIDUAL', 'MEDIANO', 'TRADICIONAL', 4, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('TOPPING DE PELON ICEE', 'PEQUENO', 'TRADICIONAL', 4, 99.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('AGUA EMBOTELLADA', 'MEDIANO', 'TRADICIONAL', 4, 38.00);

-- DULCERIA - SNACKS
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('HOT DOG TAKIS', 'MEDIANO', 'TRADICIONAL', 5, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('MINI DOGS', 'PEQUENO', 'TRADICIONAL', 5, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('PAPAS FRITAS', 'MEDIANO', 'TRADICIONAL', 5, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('EXTRA QUESO', 'PEQUENO', 'TRADICIONAL', 5, 20.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('EXTRA GUACAMOLE', 'PEQUENO', 'TRADICIONAL', 5, 25.00);

-- DULCERIA - PROMOCIONES
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('2 MAGNUM X $68', 'MEDIANO', 'TRADICIONAL', 6, 68.00);

-- DULCERIA - PARA COMPARTIR
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('MAXICOMBO FAMILIAR JUMBO', 'EXTRAGRANDE', 'VIP', 7, 472.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('MAXICOMBO FAMILIAR PARA LLEVAR', 'EXTRAGRANDE', 'VIP', 7, 496.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('MAXICOMBO MIX', 'EXTRAGRANDE', 'VIP', 7, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('MAXICOMBO MICHA MIX', 'EXTRAGRANDE', 'VIP', 7, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('MAXICOMBO M&MS PARA LLEVAR', 'EXTRAGRANDE', 'VIP', 7, 438.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('MAXICOMBO M&MS JUMBO', 'EXTRAGRANDE', 'VIP', 7, 414.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('MAXICOMBO NACHOS GRANDES', 'EXTRAGRANDE', 'VIP', 7, 429.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('MAXICOMBO NACHOS', 'EXTRAGRANDE', 'VIP', 7, 401.00);

-- DULCERIA - HELADOS
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('MAGNUM', 'MEDIANO', 'TRADICIONAL', 8, 57.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('CORNETTO', 'MEDIANO', 'TRADICIONAL', 8, 42.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('HELADO MICHA', 'MEDIANO', 'TRADICIONAL', 8, 84.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('MORDISKO OREO', 'PEQUENO', 'TRADICIONAL', 8, 46.00);

-- DULCERIA - DULCES Y CHOCOLATES
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('SKITTLES', 'PEQUENO', 'TRADICIONAL', 9, 48.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('M&MS', 'PEQUENO', 'TRADICIONAL', 9, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('STARBURST MINI', 'PEQUENO', 'TRADICIONAL', 9, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('SKITTLES WILD BERRIES', 'PEQUENO', 'TRADICIONAL', 9, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('SNICKERS', 'PEQUENO', 'TRADICIONAL', 9, 38.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('CONEJOS TURIN MINI', 'PEQUENO', 'TRADICIONAL', 9, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('TURIN ZERO', 'PEQUENO', 'TRADICIONAL', 9, 0.00);
INSERT INTO `dulceria` (`nombre`, `tamano`, `tipo`, `id_categoria_dulceria`, `precio`) VALUES ('M&MS MEGA', 'MEDIANO', 'TRADICIONAL', 9, 0.00);

-- USUARIOS Y EMPLEADOS
INSERT INTO `usuarios` (`nombre`, `primer_apellido`, `segundo_apellido`, `fecha_nacimiento`, `sexo`, `codigo_postal`, `numero_telefono`, `correo`, `contrasena`) 
VALUES ('SERGIO SEBASTIAN', 'VELASCO', 'TORRES', '2015-02-15', 'HOMBRE', '28078', '3125949425', 'SVELASCO13@UCOL.MX', 'ADMIN');
INSERT INTO `empleados` (`id_usuario`, `fecha_contratacion`, `activo`, `rol`) 
VALUES (1, '2025-01-01', 1, 'admin');
INSERT INTO `usuarios` (`nombre`, `primer_apellido`, `segundo_apellido`, `fecha_nacimiento`, `sexo`, `codigo_postal`, `numero_telefono`, `correo`, `contrasena`) 
VALUES ('CLIENTE', 'AP1', 'AP2', '2000-01-01', 'MUJER', '28075', '0000000000', 'CORREO@GMAIL.COM', 'CLIENTE');

-- CLIENTES
INSERT INTO `clientes` (`id_usuario`, `id_membresia`, `puntos`) VALUES (2, 1, 0);

-- CINES
INSERT INTO `cines` (`nombre_cine`, `codigo_postal`) VALUES ('CINEPOLIS SAN FERNANDO', '28025');
INSERT INTO `cines` (`nombre_cine`, `codigo_postal`) VALUES ('CINEPOLIS ZENTRALIA', '28030');
INSERT INTO `cines` (`nombre_cine`, `codigo_postal`) VALUES ('CINEMAS DEL COUNTRY', '28040');

-- SALAS (ASUMIENDO id_cine 1, 2, 3)
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (1, '1');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (1, '2');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (1, '3');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (1, '4');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (1, '5');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (1, '6');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (1, '7');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (1, '8');

INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (2, '1');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (2, '2');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (2, '3');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (2, '4');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (2, '5');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (2, '6');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (2, '7');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (2, '8');

INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (3, '1');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (3, '2');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (3, '3');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (3, '4');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (3, '5');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (3, '6');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (3, '7');
INSERT INTO `salas` (`id_cine`, `numero_sala`) VALUES (3, '8');

-- ASIENTOS (ASUMIENDO id_sala 1 a 24)
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (1, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (1, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (1, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (1, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (1, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (2, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (2, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (2, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (2, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (2, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (3, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (3, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (3, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (3, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (3, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (4, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (4, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (4, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (4, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (4, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (5, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (5, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (5, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (5, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (5, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (6, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (6, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (6, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (6, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (6, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (7, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (7, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (7, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (7, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (7, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (8, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (8, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (8, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (8, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (8, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (9, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (9, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (9, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (9, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (9, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (10, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (10, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (10, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (10, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (10, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (11, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (11, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (11, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (11, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (11, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (12, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (12, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (12, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (12, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (12, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (13, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (13, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (13, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (13, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (13, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (14, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (14, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (14, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (14, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (14, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (15, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (15, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (15, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (15, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (15, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (16, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (16, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (16, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (16, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (16, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (17, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (17, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (17, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (17, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (17, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (18, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (18, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (18, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (18, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (18, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (19, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (19, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (19, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (19, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (19, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (20, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (20, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (20, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (20, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (20, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (21, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (21, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (21, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (21, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (21, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (22, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (22, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (22, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (22, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (22, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (23, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (23, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (23, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (23, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (23, 'A5');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (24, 'A1');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (24, 'A2');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (24, 'A3');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (24, 'A4');
INSERT INTO `asientos` (`id_sala`, `fila_columna`) VALUES (24, 'A5');

-- RESERVAS (ASUMIENDO id_asiento 3, 16, 35, 82, 120 son válidos)
INSERT INTO `reserva` (`id_asiento`, `id_cliente`, `fecha`) 
VALUES (3, 1, '2025-11-26 19:30:00');
INSERT INTO `reserva` (`id_asiento`, `id_cliente`, `fecha`) 
VALUES (16, 1, '2025-11-27 15:45:00');
INSERT INTO `reserva` (`id_asiento`, `id_cliente`, `fecha`) 
VALUES (35, 1, '2025-11-28 22:00:00');
INSERT INTO `reserva` (`id_asiento`, `id_cliente`, `fecha`) 
VALUES (82, 1, '2025-11-29 18:00:00');
INSERT INTO `reserva` (`id_asiento`, `id_cliente`, `fecha`) 
VALUES (120, 1, '2025-11-30 14:00:00');

-- PELICULAS (ASUMIENDO id_pelicula 1 a 5)
INSERT INTO `peliculas` (`nombre`, `url_portada`, `duracion`, `director`, `url_trailer`, `genero`, `estado_cartelera`, `fecha_inicio_estreno`, `fecha_fin_estreno`, `activo`)
VALUES ('DUNE: PART TWO', 'HTTP://EJEMPLO.COM/DUNE2.JPG', '166', 'DENIS VILLENEUVE', 'HTTP://EJEMPLO.COM/DUNE2_TRAILER', 'CIENCIA FICCION', 'CARTELERA', '2025-11-01 00:00:00', '2025-12-15 23:59:59', 1);
INSERT INTO `peliculas` (`nombre`, `url_portada`, `duracion`, `director`, `url_trailer`, `genero`, `estado_cartelera`, `fecha_inicio_estreno`, `fecha_fin_estreno`, `activo`)
VALUES ('WICKED', 'HTTP://EJEMPLO.COM/WICKED.JPG', '169', 'JON M. CHU', 'HTTP://EJEMPLO.COM/WICKED_TRAILER', 'ROMANCE', 'ESTRENO', '2025-11-26 00:00:00', '2025-12-10 23:59:59', 1);
INSERT INTO `peliculas` (`nombre`, `url_portada`, `duracion`, `director`, `url_trailer`, `genero`, `estado_cartelera`, `fecha_inicio_estreno`, `fecha_fin_estreno`, `activo`)
VALUES ('THE BLACK PHONE', 'HTTP://EJEMPLO.COM/TBP.JPG', '102', 'SCOTT DERRICKSON', 'HTTP://EJEMPLO.COM/TBP_TRAILER', 'DRAMA', 'CARTELERA', '2025-10-20 00:00:00', '2025-12-05 23:59:59', 1);
INSERT INTO `peliculas` (`nombre`, `url_portada`, `duracion`, `director`, `url_trailer`, `genero`, `estado_cartelera`, `fecha_inicio_estreno`, `fecha_fin_estreno`, `activo`)
VALUES ('INTENSAMENTE 2', 'HTTP://EJEMPLO.COM/INTENSAMENTE2.JPG', '96', 'KELSEY MANN', 'HTTP://EJEMPLO.COM/IM2_TRAILER', 'COMEDIA', 'CARTELERA', '2025-09-01 00:00:00', '2025-12-31 23:59:59', 1);
INSERT INTO `peliculas` (`nombre`, `url_portada`, `duracion`, `director`, `url_trailer`, `genero`, `estado_cartelera`, `fecha_inicio_estreno`, `fecha_fin_estreno`, `activo`)
VALUES ('DEADPOOL & WOLVERINE', 'HTTP://EJEMPLO.COM/DPW.JPG', '127', 'SHAWN LEVY', 'HTTP://EJEMPLO.COM/DPW_TRAILER', 'CIENCIA FICCION', 'PROXIMAMENTE', '2025-12-25 00:00:00', NULL, 1);

-- FUNCIONES (ASUMIENDO id_sala y id_pelicula existen)
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (1, 1, '2025-11-26 15:00:00', 85.00); 
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (1, 1, '2025-11-26 18:30:00', 85.00); 
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (3, 2, '2025-11-26 19:45:00', 95.00); 
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (5, 4, '2025-11-27 14:00:00', 70.00);
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (5, 4, '2025-11-27 16:30:00', 70.00); 
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (8, 3, '2025-11-27 22:00:00', 80.00);
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (9, 2, '2025-11-28 17:30:00', 95.00); 
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (12, 1, '2025-11-29 20:00:00', 85.00);
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (16, 4, '2025-11-30 13:00:00', 70.00);
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (17, 1, '2025-11-29 16:45:00', 90.00);
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (22, 3, '2025-11-30 21:30:00', 80.00);
INSERT INTO `funciones` (`id_sala`, `id_pelicula`, `fecha_hora`, `precio`) 
VALUES (24, 2, '2025-12-01 18:00:00', 95.00);
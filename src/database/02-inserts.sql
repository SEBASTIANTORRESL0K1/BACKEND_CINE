INSERT INTO membresias (nombre) VALUES ('FAN'), ('FANATICO'), ('SUPER FANATICO');
INSERT INTO usuarios (nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena) VALUES ('Sergio Sebastian', 'Velasco', 'Torres', '2015-02-15', 'HOMBRE', '28078', '3125949425', 'svelasco13@ucol.mx', 'admin');
SELECT id_usuario FROM usuarios WHERE correo = 'svelasco13@ucol.mx';


INSERT INTO empleados (id_usuario, fecha_contratacion, activo, rol) VALUES (1, '2025-01-01', 1, 'admin');

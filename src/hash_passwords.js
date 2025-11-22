import pool from './config/pool.js';
import bcrypt from 'bcrypt';

const hashExistingPasswords = async () => {
    console.log('🔒 Iniciando proceso de hasheo de contraseñas existentes...');

    try {
        // 1. Obtener todos los usuarios
        const [usuarios] = await pool.query('SELECT id_usuario, contrasena FROM usuarios');

        if (usuarios.length === 0) {
            console.log('ℹ️ No se encontraron usuarios para procesar.');
            process.exit(0);
        }

        let updatedCount = 0;

        for (const usuario of usuarios) {
            // Verificar si la contraseña ya parece ser un hash de bcrypt (empieza con $2b$, $2a$ o $2y$ y tiene longitud 60)
            if (usuario.contrasena && usuario.contrasena.length === 60 && usuario.contrasena.startsWith('$2')) {
                console.log(`⏩ Usuario ID ${usuario.id_usuario}: La contraseña ya parece estar hasheada. Saltando.`);
                continue;
            }

            // Hashear la contraseña en texto plano
            const hashedPassword = await bcrypt.hash(usuario.contrasena, 10);

            // Actualizar en la base de datos
            await pool.query('UPDATE usuarios SET contrasena = ? WHERE id_usuario = ?', [hashedPassword, usuario.id_usuario]);

            console.log(`✅ Usuario ID ${usuario.id_usuario}: Contraseña hasheada correctamente.`);
            updatedCount++;
        }

        console.log(`🎉 Proceso completado. Se actualizaron ${updatedCount} contraseñas.`);
        process.exit(0);

    } catch (error) {
        console.error('❌ Error al hashear contraseñas:', error);
        process.exit(1);
    }
};

// Esperar un momento a que la conexión del pool se establezca
setTimeout(hashExistingPasswords, 1000);

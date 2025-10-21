import { Usuario } from "./USUARIO";

export class Empleado extends Usuario {
    constructor({ 
        id_empleado = null, 
        id_usuario = null, 
        nombre = null, 
        primer_apellido = null, 
        segundo_apellido = null, 
        fecha_nacimiento = null, 
        sexo = null, 
        codigo_postal = null, 
        numero_telefono = null, 
        correo = null, 
        contrasena = null, 
        fecha_contratacion, 
        activo, 
        rol 
    }) {
        super({ 
            id_usuario, 
            nombre, 
            primer_apellido, 
            segundo_apellido, 
            fecha_nacimiento, 
            sexo, 
            codigo_postal, 
            numero_telefono, 
            correo, 
            contrasena 
        });
        this.id_empleado = id_empleado;
        this.fecha_contratacion = fecha_contratacion;
        this.activo = activo;
        this.rol = rol;
    }
}
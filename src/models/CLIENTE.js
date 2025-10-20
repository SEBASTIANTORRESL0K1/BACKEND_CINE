import { Usuario } from "./USUARIO";
export class Cliente extends Usuario {

}

export class Cliente extends Usuario {
    constructor({ id_cliente = null, id_usuario = null, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena, puntos, id_membresia, activo }) {
        super({ id_usuario, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena });
        this.id_cliente = id_cliente;
        this.puntos = puntos;
        this.id_membresia = id_membresia;
        this.activo = activo;
    }
}

export class Usuario{
    constructor({id_usuario = null, nombre, primer_apellido, segundo_apellido, fecha_nacimiento, sexo, codigo_postal, numero_telefono, correo, contrasena }){
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.primer_apellido = primer_apellido;
        this.segundo_apellido = segundo_apellido;
        this.fecha_nacimiento = fecha_nacimiento;
        this.sexo = sexo;
        this.codigo_postal = codigo_postal;
        this.numero_telefono = numero_telefono;
        this.correo = correo;
        this.contrasena = contrasena;
    }
}

/*osmar */
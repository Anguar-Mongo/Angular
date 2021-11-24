export interface usuario{
    nombre: String,
    apellido_pat:String,
    apellido_mat:String,
    correo:String,
    password: String,
    domicilio: {
        calle:String,
        colonia:String,
        estado:String,
        municipio:String,
        numero_exterior:String,
        numero_interior:String,
    },
    telefono:String,
    _id:String
}
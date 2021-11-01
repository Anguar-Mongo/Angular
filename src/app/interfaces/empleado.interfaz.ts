export interface empleado{
    nombre: String,
    apellido_pat:String,
    apellido_mat:String,
    domicilio: {
        calle:String,
        colonia:String,
        estado:String,
        municipio:String,
        numero_exterior:String,
        numero_interior:String,
    },
    telefono:String
    salario:Number,
    fecha_ingreso:Date,
    active:boolean,
    _id:String
}
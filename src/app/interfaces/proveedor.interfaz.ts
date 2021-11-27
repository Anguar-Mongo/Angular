export interface proveedor {
    nombre:String,
    RFC:String,
    telefono:String,
    correo:String,
    domicilio: {
        calle:String,
        colonia:String,
        estado:String,
        municipio:String,
        numero_exterior:String,
        numero_interior:String
    },
    productos:Array<String>,
    _id:String
    
}



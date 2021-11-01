export interface envio {
    fechas:{
        empaque:Date,
        envio:Date,
        recibido:Date
    },
    notas:String,
    domicilio: {
        calle:String,
        colonia:String,
        estado:String,
        municipio:String,
        numero_exterior:String,
        numero_interior:String,
    },
    active:boolean,
    id_empleado:String,
    

}
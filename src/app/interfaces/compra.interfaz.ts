export interface compra {
        id_envio:String,
        id_usuario:String,
        domicilio: {
            calle:String,
            colonia:String,
            estado:String,
            municipio:String,
            numero_exterior:String,
            numero_interior:String,
        },
        total:Number,
        active:boolean,
        producto:[{
            id_producto:String,
            cantidad:Number
        }],
        _id:String
        

}
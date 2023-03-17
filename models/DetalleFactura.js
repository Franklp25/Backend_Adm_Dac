import mongoose from 'mongoose'

const detalleFacturaSchema = mongoose.Schema({
    producto:{
        type:String,
        trim: true,
        required: true,
    },
    precioUnitario: {
        type:Number,
        trim: true,
        required: true,
    },
    cantidad: {
        type:Number,
        trim: true,
        required: true,
    },
    descuento: {
        type:Number,
        trim: true,
        required: true,
    },
    

},{
    timestamps: true
});

const DetalleFactura= mongoose.model('DetalleFactura', detalleFacturaSchema);
export default DetalleFactura;
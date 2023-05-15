import mongoose from 'mongoose'

const detalleFacturaSchema = mongoose.Schema({
    producto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
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
        default:0
    },
    factura: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Factura",
    }
    

},{
    timestamps: true
});

const DetalleFactura= mongoose.model('DetalleFactura', detalleFacturaSchema);
export default DetalleFactura;
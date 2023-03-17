import mongoose from 'mongoose'

const facturaSchema = mongoose.Schema({
    fechaEmision:{
        type:Date,
        required:true,
        default:Date.now,
    },
    fechaVencimiento:{
        type:Date,
        required:true,
        //default:Date.now,
    },
    iva: {
        type:Number,
        required:true,
    },
    subtotal: {
        type:Number,
        required:true,
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
    }
    
},{
    timestamps: true,
});

const Factura = mongoose.model("Factura",facturaSchema);
export default Factura;
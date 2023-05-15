import mongoose from "mongoose";

const facturaSchema = mongoose.Schema(
    {
        numFacturaCobrar: {
            type: Number,
            required: true,
            unique: true,
        },
        fechaEmision: {
            type: Date,
            required: true,
            default: Date.now,
        },
        diasCredito: {
            type: Number,
            required: false,
        },
        fechaVencimiento: {
            type: Date,
            required: false,
            //default:Date.now,
        },
        iva: {
            type: Number,
            required: true,
            default: 0,
        },
        subtotal: {
            type: Number,
            required: true,
            default: 0,
        },
        estado: {
            type: Boolean,
            required: true,
            default: false,
        },
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cliente",
        },
    },
    {
        timestamps: true,
    }
);

const Factura = mongoose.model("Factura", facturaSchema);
export default Factura;

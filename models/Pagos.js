import mongoose from "mongoose";

const pagosSchema = mongoose.Schema(
    {
        numFactura: {
            type: Number,
            required: true,
        },
        proveedor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Proveedor",
        },
        fechaEmision: {
            type: Date,
            required: true,
            default: Date.now,
        },
        diasCredito: {
            type: Number,
            required: true,
        },
        fechaVencimiento: {
            type: Date,
            required: true,
            //default:Date.now,
        },

        estado: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Pagos = mongoose.model("Pagos", pagosSchema);
export default Pagos;

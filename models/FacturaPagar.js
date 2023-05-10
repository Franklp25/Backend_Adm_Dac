import mongoose from "mongoose";

const facturaPagarSchema = mongoose.Schema(
    {
        numFacturaPagar: {
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
        total: {
            type: Number,
            required: true,
            default: 0,
        },
        fechaVencimiento: {
            type: Date,
            required: false,
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

const FacturaPagar = mongoose.model("FacturaPagar", facturaPagarSchema);
export default FacturaPagar;

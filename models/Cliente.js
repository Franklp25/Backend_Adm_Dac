import mongoose from "mongoose";

const clienteSchema = mongoose.Schema(
    {
        tipoCedula: {
            type: String,
            required: true,
            trim: true,
        },
        cedula: {
            type: String,
            required: true,
            trim: true,
        },
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        apellidos: {
            type: String,
            required: false,
            trim: true,
        },
        telefono: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        direccion: {
            type: String,
            trim: true,
        },
        estatus: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Cliente = mongoose.model("Cliente", clienteSchema);

export default Cliente;

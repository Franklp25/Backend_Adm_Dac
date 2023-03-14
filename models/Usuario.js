import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true, //quita los espacios de inicio y final
        },
        password: {
            type: String,
            required: true,
            trim: true, //quita los espacios de inicio y final
        },
        email: {
            //con el correo se van a registrar
            type: String,
            required: true,
            trim: true,
            unique: true, // se garantiza un usuario por cuenta
        },
        token: {
            type: String,
        },
        confirmado: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // crea el createdAT y el updatedAT
    }
);

usuarioSchema.pre("save", async function (next) {
    //se ejecuta antes de guardar los usuarios en la base de datos
    if (!this.isModified("password")) {
        // si no modifica el password que no modifique el hash
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); //genera el hash y lo pasa al password
});

//Comprobar password
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password); //compare comprueba un string que no esta hasheado con uno que si
};

//definicion de modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;

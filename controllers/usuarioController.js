import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js";

const registrar = async (req, res) => {
    //Enviar mensaje de No registros duplicados
    const { email } = req.body; //extraemos email.
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const usuario = new Usuario(req.body); //crea el objeto con la informacion de usuario
        usuario.token = generarId();
        await usuario.save();

        //enviar correo de confirmacion
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token,
        });

        res.json({ msg: "Usuario creado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    //Comprobar que el usuario exista
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("El usuario no está registrado");
        return res.status(404).json({ msg: error.message });
    }

    //Comprobar que el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("La cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
    }

    //comprobar passsword de ingreso
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
        });
    } else {
        const error = new Error("Contraseña incorrecta");
        return res.status(403).json({ msg: error.message });
    }
};

const confirmar = async (req, res) => {
    const { token } = req.params; //extraemos datos de la url
    const usuarioConfirmar = await Usuario.findOne({ token });

    if (!usuarioConfirmar) {
        const error = new Error("Token no válido");
        return res.status(403).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        res.json({ msg: "Usuario confirmado correctamente" });
    } catch (error) {
        console.log(error);
    }
};

const olvidarPassword = async (req, res) => {
    //preguntamos al usuario su email
    const { email } = req.body;
    //Comprobar que el usuario exista
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("El usuario no está registrado");
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuario.token = generarId();
        await usuario.save();

        //enviar Email
        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token,
        });

        res.json({
            msg: "Te hemos enviado un correo, revisa tu bandeja de entrada",
        });
    } catch (error) {
        console.log(error);
    }
};
const comprobarToken = async (req, res) => {
    const { token } = req.params; //extraemos valores de la url
    const tokenValido = await Usuario.findOne({ token });

    if (tokenValido) {
        res.json({ msg: "Token válido" });
    } else {
        const error = new Error("Token no válido");
        return res.status(404).json({ msg: error.message });
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });

    if (usuario) {
        usuario.password = password;
        usuario.token = "";
        try {
            await usuario.save();
            res.json({ msg: "Contraseña modificada correctamente" });
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error("Token no válido");
        return res.status(404).json({ msg: error.message });
    }
};

const perfil = async (req, res) => {
    const { usuario } = req;
    res.json(usuario);
};

export {
    registrar,
    autenticar,
    confirmar,
    olvidarPassword,
    comprobarToken,
    nuevoPassword,
    perfil,
};

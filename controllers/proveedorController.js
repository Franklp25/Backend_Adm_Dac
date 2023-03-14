import Proveedor from "../models/Proveedor.js";

const nuevoProveedor = async (req, res) => {
    const proveedor = new Proveedor(req.body);

    try {
        const proveedorAlmacenado = await proveedor.save();
        res.json(proveedorAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerProveedores = async (req, res) => {
    const proveedores = await Proveedor.find();

    res.json(proveedores);
};

const obtenerProveedor = async (req, res) => {
    const { id } = req.params;
    let proveedor;

    try {
        proveedor = await Proveedor.findById(id);
    } catch (e) {
        const error = new Error("ID de proveedor inválido");
        return res.status(404).json({ msg: error.message });
    }
    if (!proveedor) {
        const error = new Error("Proveedor no encontrado");
        return res.status(404).json({ msg: error.message });
    }

    res.json(proveedor);
};

const editarProveedor = async (req, res) => {
    const { id } = req.params;
    let proveedor;

    try {
        proveedor = await Proveedor.findById(id);
    } catch (e) {
        const error = new Error("ID de proveedor inválido");
        return res.status(404).json({ msg: error.message });
    }
    if (!proveedor) {
        const error = new Error("Proveedor no encontrado");
        return res.status(404).json({ msg: error.message });
    }

    proveedor.cedula = req.body.cedula || proveedor.cedula;
    proveedor.nombre = req.body.nombre || proveedor.nombre;
    proveedor.apellidos = req.body.apellidos || proveedor.apellidos;
    proveedor.telefono = req.body.telefono || proveedor.telefono;
    proveedor.email = req.body.email || proveedor.email;
    proveedor.direccion = req.body.direccion || proveedor.direccion;
    proveedor.estatus = req.body.estatus || proveedor.estatus;

    try {
        const proveedorAlmacenado = await proveedor.save();
        res.json(proveedorAlmacenado);
    } catch (e) {
        console.log(error);
    }
};

const eliminarProveedor = async (req, res) => {
    const { id } = req.params;
    let proveedor;

    try {
        cliproveedornte = await Proveedor.findById(id);
    } catch (e) {
        const error = new Error("ID de proveedor inválido");
        return res.status(404).json({ msg: error.message });
    }
    if (!proveedor) {
        const error = new Error("Proveedor no encontrado");
        return res.status(404).json({ msg: error.message });
    }

    try {
        await proveedor.deleteOne();
        res.json({ msg: "Proveedor Eliminado" });
    } catch (error) {
        console.log(error);
    }
};

export {
    nuevoProveedor,
    obtenerProveedores,
    obtenerProveedor,
    editarProveedor,
    eliminarProveedor,
};

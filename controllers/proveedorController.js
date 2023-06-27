import Proveedor from "../models/Proveedor.js";
import FacturaPagar from "../models/FacturaPagar.js";

const nuevoProveedor = async (req, res) => {
    const { cedula, email } = req.body; // Extraemos cedula y correo electrónico.

    try {
        const existeProveedorCedula = await Proveedor.findOne({ cedula });
        if (existeProveedorCedula) {
            const error = new Error(
                "Proveedor con la misma cédula ya registrado"
            );
            return res.status(400).json({ msg: error.message });
        }

        const existeProveedorEmail = await Proveedor.findOne({ email });
        if (existeProveedorEmail) {
            const error = new Error(
                "Proveedor con el mismo correo electrónico ya registrado"
            );
            return res.status(400).json({ msg: error.message });
        }

        const proveedor = new Proveedor(req.body);
        const proveedorAlmacenado = await proveedor.save();
        res.json(proveedorAlmacenado);
    } catch (error) {
        console.log(error);
        const errorMessage = "Hubo un error inesperado al crear el proveedor"; // Mensaje de error
        res.status(500).json({ msg: errorMessage });
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
        proveedor = await Proveedor.findById(id);
    } catch (e) {
        const error = new Error("ID de proveedor inválido");
        return res.status(404).json({ msg: error.message });
    }
    if (!proveedor) {
        const error = new Error("Proveedor no encontrado");
        return res.status(404).json({ msg: error.message });
    }

    // Verificar si el cliente está presente en alguna factura
    const factura = await FacturaPagar.findOne({ proveedor: id });

    if (factura) {
        const error = new Error(
            "No se puede eliminar el proveedor, está asociado a una factura"
        );
        return res.status(400).json({ msg: error.message });
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

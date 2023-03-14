import Cliente from "../models/Cliente.js";

const nuevoCliente = async (req, res) => {
    const cliente = new Cliente(req.body);

    try {
        const clienteAlmacenado = await cliente.save();
        res.json(clienteAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerClientes = async (req, res) => {
    const clientes = await Cliente.find();

    res.json(clientes);
};

const obtenerCliente = async (req, res) => {
    const { id } = req.params;
    let cliente;

    try {
        cliente = await Cliente.findById(id);
    } catch (e) {
        const error = new Error("ID de cliente inválido");
        return res.status(404).json({ msg: error.message });
    }
    if (!cliente) {
        const error = new Error("Cliente no encontrado");
        return res.status(404).json({ msg: error.message });
    }

    res.json(cliente);
};

const editarCliente = async (req, res) => {
    const { id } = req.params;
    let cliente;

    try {
        cliente = await Cliente.findById(id);
    } catch (e) {
        const error = new Error("ID de cliente inválido");
        return res.status(404).json({ msg: error.message });
    }
    if (!cliente) {
        const error = new Error("Cliente no encontrado");
        return res.status(404).json({ msg: error.message });
    }

    cliente.cedula = req.body.cedula || cliente.cedula;
    cliente.nombre = req.body.nombre || cliente.nombre;
    cliente.apellidos = req.body.apellidos || cliente.apellidos;
    cliente.telefono = req.body.telefono || cliente.telefono;
    cliente.email = req.body.email || cliente.email;
    cliente.direccion = req.body.direccion || cliente.direccion;
    cliente.estatus = req.body.estatus || cliente.estatus;

    try {
        const clienteAlmacenado = await cliente.save();
        res.json(clienteAlmacenado);
    } catch (e) {
        console.log(error);
    }
};

const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    let cliente;

    try {
        cliente = await Cliente.findById(id);
    } catch (e) {
        const error = new Error("ID de cliente inválido");
        return res.status(404).json({ msg: error.message });
    }
    if (!cliente) {
        const error = new Error("Cliente no encontrado");
        return res.status(404).json({ msg: error.message });
    }

    try {
        await cliente.deleteOne();
        res.json({ msg: "Cliente Eliminado" });
    } catch (error) {
        console.log(error);
    }
};

export {
    nuevoCliente,
    obtenerCliente,
    obtenerClientes,
    editarCliente,
    eliminarCliente,
};

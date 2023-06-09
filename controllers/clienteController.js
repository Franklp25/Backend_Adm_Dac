import Cliente from "../models/Cliente.js";
import Factura from "../models/Factura.js";

const nuevoCliente = async (req, res) => {
    const { cedula, email } = req.body; // Extraemos cedula y correo electrónico.

    try {
        const existeClienteCedula = await Cliente.findOne({ cedula });
        if (existeClienteCedula) {
            const error = new Error(
                "Cliente con la misma cédula ya registrado"
            );
            return res.status(400).json({ msg: error.message });
        }

        const existeClienteEmail = await Cliente.findOne({ email });
        if (existeClienteEmail) {
            const error = new Error(
                "Cliente con el mismo correo electrónico ya registrado"
            );
            return res.status(400).json({ msg: error.message });
        }

        const cliente = new Cliente(req.body);
        const clienteAlmacenado = await cliente.save();
        res.json({ msg: "Se ha almacenado el cliente correctamente" });
    } catch (error) {
        console.log(error);
        const errorMessage = "Hubo un error inesperado al crear el cliente"; // Mensaje de error
        res.status(500).json({ msg: errorMessage });
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

    // Verificar si el cliente está presente en alguna factura
    const factura = await Factura.findOne({ cliente: id });

    if (factura) {
        const error = new Error(
            "No se puede eliminar el cliente, está asociado a una factura"
        );
        return res.status(400).json({ msg: error.message });
    }

    try {
        await cliente.deleteOne();
        res.json({ msg: "Cliente eliminado" });
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

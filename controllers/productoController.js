import Producto from "../models/Producto.js";

const nuevoProducto = async (req, res) => {
    const producto = new Producto(req.body);

    try {
        const productoAlmacenado = await producto.save();
        res.json(productoAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerProductos = async (req, res) => {
    const productos = await Producto.find();

    res.json(productos);
};

const obtenerProducto = async (req, res) => {
    const { id } = req.params;
    let producto;

    try {
        producto = await Producto.findById(id);
    } catch (e) {
        const error = new Error("ID de producto inválido");
        return res.status(404).json({ msg: error.message });
    }

    if (!producto) {
        const error = new Error("Producto no encontrado");

        return res.status(404).json({ msg: error.message });
    }

    res.json(producto);
};

const editarProducto = async (req, res) => {
    const { id } = req.params;
    let producto;

    try {
        producto = await Producto.findById(id);
    } catch (e) {
        const error = new Error("ID de producto inválido");
        return res.status(404).json({ msg: error.message });
    }

    if (!producto) {
        const error = new Error("Producto no encontrado");

        return res.status(404).json({ msg: error.message });
    }

    producto.codigo = req.body.codigo || producto.codigo;
    producto.nombre = req.body.nombre || producto.nombre;
    producto.unidadMedida = req.body.unidadMedida || producto.unidadMedida;
    producto.cantidad = req.body.cantidad || producto.cantidad;
    producto.precio = req.body.precio || producto.precio;
    producto.descripcion = req.body.descripcion || producto.descripcion;
    try {
        const productoAlmacenado = await producto.save();
        res.json(productoAlmacenado);
    } catch (e) {
        console.log(error);
    }
};

const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    let producto;

    try {
        producto = await Producto.findById(id);
    } catch (e) {
        const error = new Error("ID de producto inválido");
        return res.status(404).json({ msg: error.message });
    }

    if (!producto) {
        const error = new Error("Producto no encontrado");

        return res.status(404).json({ msg: error.message });
    }

    try {
        await producto.deleteOne();
        res.json({ msg: "Producto Eliminado" });
    } catch (error) {
        console.log(error);
    }
};

export {
    nuevoProducto,
    obtenerProducto,
    obtenerProductos,
    editarProducto,
    eliminarProducto,
};

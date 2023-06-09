import Factura from "../models/Factura.js";
import DetalleFactura from "../models/DetalleFactura.js";

const obtenerFacturas = async (req, res) => {
    const facturas = await Factura.find();

    res.json(facturas);
};

const nuevaFactura = async (req, res) => {
    const factura = new Factura(req.body);

    try {
        const facturaAlmacenada = await factura.save();
        res.json(facturaAlmacenada);
    } catch (error) {
        console.log(error);
    }
};

const obtenerFactura = async (req, res) => {
    const { id } = req.params;
    let factura, detallesFactura;

    try {
        factura = await Factura.findById(id);
        detallesFactura = await DetalleFactura.find()
            .where("factura")
            .equals(factura._id);
    } catch (e) {
        const error = new Error("ID de factura inválido");
        return res.status(404).json({ msg: error.message });
    }

    res.json({
        factura,
        detallesFactura,
    });
};

const obtenerFacturasCliente = async (req, res) => {
    const { id } = req.params;
    let facturas;
    try {
        facturas = await Factura.find({ cliente: id });
    } catch (e) {
        const error = new Error("ID de Cliente inválido");
        return res.status(404).json({ msg: error.message });
    }

    res.json(facturas);
};

const editarFactura = async (req, res) => {
    const { id } = req.params;
    let factura;
    try {
        factura = await Factura.findById(id);
    } catch (e) {
        const error = new Error("ID de factura inválido");
        return res.status(404).json({ msg: error.message });
    }
    if (!factura) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    }

    factura.fechaEmision = req.body.fechaEmision || factura.fechaEmision;
    factura.fechaVencimiento =-
        req.body.fechaVencimiento || factura.fechaVencimiento;

    // Agregar pagos parciales si se proporcionan en el body
    if (req.body.pagosParciales) {
        factura.pagosParciales = req.body.pagosParciales;
    }

    if (req.body.estado != null) {
        factura.estado = req.body.estado;
    }

    try {
        const facturaAlmacenada = await factura.save();
        res.json(facturaAlmacenada);
    } catch (error) {
        console.log(error);
    }
};

const eliminarFactura = async (req, res) => {
    const { id } = req.params;
    let factura;
    try {
        factura = await Factura.findById(id);
    } catch (e) {
        const error = new Error("ID de factura inválido");
        return res.status(404).json({ msg: error.message });
    }
    if (!factura) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    }

    try {
        await factura.deleteOne();
        res.json({ msg: "Factura eliminada correctamente" });
    } catch (error) {
        console.log(error);
    }
};

export {
    obtenerFactura,
    obtenerFacturas,
    nuevaFactura,
    editarFactura,
    eliminarFactura,
    obtenerFacturasCliente,
};

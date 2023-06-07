import FacturaPagar from "../models/FacturaPagar.js";

const nuevaFacturaPagar = async (req, res) => {
    const facturaPagar = new FacturaPagar(req.body);

    try {
        const facturaPagarAlmacenado = await facturaPagar.save();
        res.json(facturaPagarAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerFacturasPagar = async (req, res) => {
    const facturasPagar = await FacturaPagar.find();
    res.json(facturasPagar);
};

//this jhon
const obtenerFacturaPagar = async (req, res) => {
    const { id } = req.params;
    let facturaPagar;

    try {
        facturaPagar = await FacturaPagar.findById(id);
    } catch (e) {
        const error = new Error("ID de factura inválido");
        return res.status(404).json({ msg: error.message });
    }
    res.json(facturaPagar);
};

const obtenerFacturaPagarProveedor = async (req, res) => {
    const { id } = req.params;
    let facturaPagar;

    try {
        facturaPagar = await FacturaPagar.find({ proveedor: id });
    } catch (e) {
        const error = new Error("ID de Proveedor inválido");
        return res.status(404).json({ msg: error.message });
    }
    res.json(facturaPagar);
};

const editarFactura = async (req, res) => {
    const { id } = req.params;
    let facturaPagar;

    try {
        facturaPagar = await FacturaPagar.findById(id);
    } catch (e) {
        const error = new Error("ID de factura inválido");
        return res.status(404).json({ msg: error.message });
    }
    if(!facturaPagar){
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    }

    facturaPagar.numFacturaPagar = req.body.numFacturaPagar || facturaPagar.numFacturaPagar;
    facturaPagar.fechaEmision = req.body.fechaEmision || facturaPagar.fechaEmision;
    facturaPagar.diasCredito = req.body.diasCredito || facturaPagar.diasCredito;
    facturaPagar.total = req.body.total || facturaPagar.total;
    facturaPagar.fechaVencimiento = req.body.fechaVencimiento || facturaPagar.fechaVencimiento;
    if(req.body.estado!=null){
        facturaPagar.estado = req.body.estado;
    }

    try {
        const facturaPagarAlmacenada = await facturaPagar.save();
        res.json(facturaPagarAlmacenada);
    } catch (error) {
        console.log(error);
    }
}; 

const eliminarFacturaPagar = async (req, res) =>{
    const { id } = req.params;
    let facturaPagar;

    try {
        facturaPagar = await FacturaPagar.findById(id);
    } catch (e) {
        const error = new Error("ID de factura inválido");
        return res.status(404).json({ msg: error.message });
    }
    if (!facturaPagar) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    }
    try {
        await facturaPagar.deleteOne();
        res.json({ msg: "Factura eliminada correctamente" });
    } catch (error) {
        console.log(error);
    }
}

export {
    nuevaFacturaPagar,
    obtenerFacturasPagar,
    obtenerFacturaPagar,
    obtenerFacturaPagarProveedor,
    editarFactura,
    eliminarFacturaPagar,

};

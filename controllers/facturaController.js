import Factura from "../models/Factura.js";
import DetalleFactura from "../models/DetalleFactura.js";

const obtenerFacturas = async (req,res)=>{
    const facturas = await Factura.find().where("factura").equals(req.cliente)

    res.json(facturas);
};

const nuevaFactura = async (req,res)=>{

};

const obtenerFactura = async (req,res)=>{

};

const editarFactura = async (req,res)=>{

};

const eliminarFactura = async (req,res)=>{

};

export {
    obtenerFactura,
    obtenerFacturas,
    nuevaFactura,
    editarFactura,
    eliminarFactura,
}
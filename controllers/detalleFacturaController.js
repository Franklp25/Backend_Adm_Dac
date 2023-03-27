import Factura from "../models/Factura.js";
import DetalleFactura from "../models/DetalleFactura.js";

const agregarDetalle= async (req,res)=> {
    let {factura}= req.body;

    let existeFactura

    try{
        existeFactura= await Factura.findById(factura);

    } catch(e) {
        const error= new Error("La factura no existe");
        return res.status(404).json({msg: error.message});

    }

    try {
        const subTotalAux=(req.body.cantidad*req.body.precioUnitario)-req.body.descuento;
        existeFactura.subtotal=existeFactura.subtotal+subTotalAux;
        existeFactura.iva= existeFactura.subtotal*0.13
        existeFactura.save();
        const detalleAlmacenado= await DetalleFactura.create(req.body);
        res.json(detalleAlmacenado);
    } catch(error){
        console.log(error)
    }

};

const obtenerDetalle= async (req,res)=>{
    const {id} = req.params;
    let detalleFactura;

    try{
        detalleFactura= await DetalleFactura.findById(id)
    } catch(e){
        const error= new Error("ID de detalle inválido");
        return res.status(404).json({msg:error.message});
    }
    if(!detalleFactura){
        const error= new Error("detalle no encontrado");
        return res.status(404).json({msg:error.message});
    }

    res.json(detalleFactura);
}

const actualizarDetalle= async (req,res)=>{
    const {id} = req.params;
    let detalleFactura,facturaObj;

    try{
        detalleFactura= await DetalleFactura.findById(id)
        facturaObj= await Factura.findById(detalleFactura.factura)
    } catch(e){
        const error= new Error("ID de detalle inválido");
        return res.status(404).json({msg:error.message});
    }
    if(!detalleFactura){
        const error= new Error("detalle no encontrado inválido");
        return res.status(404).json({msg:error.message});
    }
    //Restamos el Precio viejo del DetalleFactura a la factura
    const subTotalViejo=(detalleFactura.cantidad*detalleFactura.precioUnitario)-detalleFactura.descuento;
    facturaObj.subtotal=facturaObj.subtotal-subTotalViejo;

    detalleFactura.producto= req.body.producto|| detalleFactura.producto;
    detalleFactura.precioUnitario= req.body.precioUnitario|| detalleFactura.precioUnitario;
    detalleFactura.cantidad= req.body.cantidad|| detalleFactura.cantidad;
    detalleFactura.descuento= req.body.descuento|| detalleFactura.descuento;

    //Sumamos el Precio nuevo del detalle a la factura
    const subTotalAux=(detalleFactura.cantidad*detalleFactura.precioUnitario)-detalleFactura.descuento;
    facturaObj.subtotal=facturaObj.subtotal+subTotalAux;
    facturaObj.iva=facturaObj.subtotal*0.13
    try{
        facturaObj.save();
        const detalleAlmacenado = await detalleFactura.save();
        res.json(detalleAlmacenado);
    } catch(error){
        console.log(error);
    }
};

const eliminarDetalle= async (req,res)=>{
    const{id} = req.params;
    let detalleFactura,facturaObj;

    try{
        detalleFactura = await DetalleFactura.findById(id).populate("factura");
        facturaObj= detalleFactura.factura;
    } catch(e) {
        const error= new Error("ID de detalle inválido");
        return res.status(404).json({msg:error.message});
    }
    if(!detalleFactura){
        const error= new Error("detalle no encontrado inválido");
        return res.status(404).json({msg:error.message});
    }

    const subTotalViejo=(detalleFactura.cantidad*detalleFactura.precioUnitario)-detalleFactura.descuento;
    facturaObj.subtotal=facturaObj.subtotal-subTotalViejo;
    facturaObj.iva= facturaObj.subtotal*0.13;

    try{
        facturaObj.save();
        await detalleFactura.deleteOne()
        res.json({msg:'Detalle eliminado'})
    } catch(error){
        console.log(error);
    }
};


export{
    agregarDetalle,
    obtenerDetalle,
    actualizarDetalle,
    eliminarDetalle,
}
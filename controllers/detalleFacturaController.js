import Factura from "../models/Factura.js";
import DetalleFactura from "../models/DetalleFactura.js";

const agregarDetalle= async (req,res)=> {
    const {factura}= req.body;

    let existeFactura

    try{
        existeFactura= await Factura.findById(factura);

    } catch(e) {
        const error= new Error("La factura no existe");
        return res.status(404).json({msg: error.message});

    }

    try {
        subTotalaux=(req.cantidad*req.precioUnitario)-descuento
        factura.subtotal=factura.subtotal+subTotalaux;
        factura.save();
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
        const error= new Error("detalle no encontrado inválido");
        return res.status(404).json({msg:error.message});
    }

    res.json(tarea);
}

const actualizarDetalle= async (req,res)=>{
    const {id} = req.params;
    let detalleFactura;

    try{
        detalleFactura= await DetalleFactura.findById(id)
    } catch(e){
        const error= new Error("ID de detalle inválido");
        return res.status(404).json({msg:error.message});
    }
    if(!detalleFactura){
        const error= new Error("detalle no encontrado inválido");
        return res.status(404).json({msg:error.message});
    }

    detalleFactura.producto= req.body.producto|| detalleFactura.producto;
    detalleFactura.precioUnitario= req.body.precioUnitario|| detalleFactura.precioUnitario;
    detalleFactura.cantidad= req.body.cantidad|| detalleFactura.cantidad;
    detalleFactura.descuento= req.body.descuento|| detalleFactura.descuento;

    try{
        const detalleAlmacenado = await detalleFactura.save();
        res.json(detalleAlmacenado);
    } catch(error){
        console.log(error);
    }
};

const eliminarDetalle= async (req,res)=>{
    const{id} = req.params;
    let detalleFactura;

    try{
        detalleFactura = await DetalleFactura.findById(id).populate("factura");
    } catch(e) {
        const error= new Error("ID de detalle inválido");
        return res.status(404).json({msg:error.message});
    }
    if(!detalleFactura){
        const error= new Error("detalle no encontrado inválido");
        return res.status(404).json({msg:error.message});
    }

    try{
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
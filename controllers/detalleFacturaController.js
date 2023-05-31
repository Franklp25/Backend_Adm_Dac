import Factura from "../models/Factura.js";
import DetalleFactura from "../models/DetalleFactura.js";
import Producto from "../models/Producto.js";

const agregarDetalle= async (req,res)=> {
    let {factura,precioUnitario,producto}= req.body;

    let existeFactura,existeProducto;

    try{
        existeFactura= await Factura.findById(factura);
        existeProducto= await Producto.findById(producto);

    } catch(e) {
        const error= new Error("La factura no existe");
        return res.status(404).json({msg: error.message});

    }

    console.log(existeFactura);
    if(!precioUnitario || precioUnitario<=0){
        req.body.precioUnitario=existeProducto.precio;
    }

    if(existeFactura!=null){
        try {
            //recordar realizar la resta del descuento en el futuro
            const subTotalAux=(req.body.cantidad*req.body.precioUnitario);
            existeFactura.subtotal=existeFactura.subtotal+subTotalAux;
            existeFactura.iva= existeFactura.subtotal*0.13
            console.log(existeFactura);
            existeFactura.save();
            const detalleAlmacenado= await DetalleFactura.create(req.body);
            res.json(detalleAlmacenado);
        } catch(error){
            console.log(error);
        }
    }else{
        const error= new Error("La factura no existe");
        return res.status(404).json({msg: error.message});
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

const obtenerEstadisticas = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query; // Obtenemos las fechas desde los parámetros de consulta

    // Convertimos las fechas a objetos de fecha de JavaScript
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);

    // Establecemos la hora del inicio del día para la fecha de inicio y la hora del final del día para la fecha de fin
    fechaInicioDate.setHours(0, 0, 0, 0);
    fechaFinDate.setHours(23, 59, 59, 999);

    try {
        const estadisticas = await DetalleFactura.aggregate([
            // Filtramos los datos por el rango de fechas
            {
                $match: {
                    createdAt: {
                        $gte: fechaInicioDate,
                        $lte: fechaFinDate,
                    },
                },
            },
            { $group: { _id: "$producto", ventas: { $sum: "$cantidad" } } },
            { $lookup: { from: "productos", localField: "_id", foreignField: "_id", as: "producto" } },
            { $unwind: "$producto" },
            { $project: { nombre: "$producto.nombre", ventas: 1, _id: 0 } }
        ]);

        res.json(estadisticas);
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al obtener las estadísticas de ventas.");
    }
};

const obtenerDetallesFacturas = async (req, res) => {
    try {
      const detalles = await DetalleFactura.find();
      res.json(detalles);
    } catch (error) {
      console.error(error);
      res.status(500).send("Hubo un error al obtener los detalles de facturas.");
    }
  };

export{
    agregarDetalle,
    obtenerDetalle,
    actualizarDetalle,
    eliminarDetalle,
    obtenerEstadisticas,
    obtenerDetallesFacturas
}

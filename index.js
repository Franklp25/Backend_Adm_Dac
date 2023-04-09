//Configuracion del servidor
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import clienteRoutes from "./routes/ClienteRoutes.js";
import proveedorRoutes from "./routes/proveedorRoutes.js";
import DetalleFactura from "./routes/detalleFacturaRoutes.js";
import Factura from "./routes/facturaRoutes.js";
import Producto from "./routes/productoRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB(); // conectar a mongoDB

//configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        // console.log(origin);
        if (whitelist.includes(origin)) {
            //puede consultar la API
            callback(null, true);
        } else {
            //no esta permitido el  request
            callback(new Error("Error de Cors"));
        }
    },
};
app.use(cors(corsOptions));

//Routing----------------------------------------------------------------------------------------
app.use("/api/usuarios", usuarioRoutes); //USE responde a todos los verbos http // req = Datos enviados y res= resppuesta que se obtiene
app.use("/api/clientes", clienteRoutes);
app.use("/api/proveedor", proveedorRoutes);
app.use("/api/detalle_factura",DetalleFactura);
app.use("/api/facturas",Factura);
app.use("/api/productos",Producto);

//------------------------------------------------------------------------------------------------

const PORT = process.env.PORT || 4000; // variable de entorno para el puerto, si no existe que le asigne el puerto 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

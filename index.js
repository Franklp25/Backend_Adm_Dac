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
import FacturaPagar from "./routes/facturaPagarRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Swagger
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node MongoDB API",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
};
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
//app.use(cors(corsOptions));
app.use(
    "/api-doc",
    swaggerUI.serve,
    swaggerUI.setup(swaggerJSDoc(swaggerSpec))
);
//Routing----------------------------------------------------------------------------------------
app.use("/api/usuarios", usuarioRoutes); //USE responde a todos los verbos http // req = Datos enviados y res= resppuesta que se obtiene
app.use("/api/clientes", clienteRoutes);
app.use("/api/proveedor", proveedorRoutes);
app.use("/api/detalle_factura", DetalleFactura);
app.use("/api/facturas", Factura);
app.use("/api/productos", Producto);
app.use("/api/facturas-pagar", FacturaPagar);

//------------------------------------------------------------------------------------------------

const PORT = process.env.PORT || 4000; // variable de entorno para el puerto, si no existe que le asigne el puerto 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

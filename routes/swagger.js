import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//Meta data info abour our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Backend_Adm_Dac",
            version: "1.0.0",
        },
    },
    apis: ["./ClienteRoutes.js", "../models/Cliente.js"],
};

//docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

//Function to setup our docs
const swaggerDocs = (app, port) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get(".api/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log(
        `Version 1 Docs are Available at http://localhost:${port}/api/docs/ `
    );
};

export { swaggerDocs };

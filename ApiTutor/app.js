import express from "express";
import cors from "cors";
import db from "./database/db.js";
import userRoutes from "./routes/routes.js";
import ejerciciosRoutes from "./routes/ejerciciosRoutes.js";
import temasRouter from "./routes/temasRoutes.js";
import imagenesEjerRoutes from "./routes/imagenesEjerRoutes.js"
import userEjerRoutes from "./routes/userEjerRoutes.js"
import ideasRoutes from "./routes/ideasRoutes.js"

// Importar los modelos para que se apliquen las asociaciones automáticamente
import "./models/relations.js"; // Esto ahora se importa para aplicar las asociaciones automáticamente

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de rutas
app.use("/api", userRoutes);
app.use("/api", ejerciciosRoutes);
app.use("/api", temasRouter);
app.use("/api",imagenesEjerRoutes);
app.use("/api", userEjerRoutes);
app.use("/api", ideasRoutes);

// Función para iniciar el servidor
const startServer = async () => {
    try {
        // Conectar a la base de datos
        await db.authenticate();
        console.log("Conexión exitosa a la base de datos");

        // Sincronizar la base de datos (opcionalmente usar `{ alter: true }` para actualizar las tablas sin perder datos)
        await db.sync({ alter: true });
        console.log("Modelos sincronizados con la base de datos");

        // Ruta raíz
        app.get("/", (req, res) => {
            res.send("La API está funcionando correctamente");
        });

        // Iniciar el servidor en el puerto 8000
        app.listen(8000, () => {
            console.log("Servidor corriendo en puerto 8000");
        });
    } catch (error) {
        console.error("Error de conexión:", error);
    }
};

// Iniciar el servidor
startServer();

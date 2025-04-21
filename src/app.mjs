
import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

const app = express();
const PORT = process.env.PORT || 3000;

// Obtener la ruta del directorio actual (por usar módulos ES)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Carpeta donde estarán los archivos .ejs

// Middleware para parsear JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true })); //esta linea es importante para que express pueda leer los datos del formulario

app.use(methodOverride('_method')); // este método permite solicitudes PUT en html

// Conexión a base de datos
connectDB();

// Rutas
app.use('/api', superHeroRoutes);

app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

//Lbrary imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Import routes
import especialidadRoutes from './routes/especialidad.routes.js';
import medicoRoutes from './routes/medico.routes.js';
import pacienteRoutes from './routes/paciente.routes.js';
import previsionRoutes from './routes/prevision.routes.js';

const app = express();

//Middlewares
app.use(cors({
    origin: ['http://localhost:4200', '*'],
    credentials: true
}));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api', especialidadRoutes);
app.use('/api', medicoRoutes);
app.use('/api', pacienteRoutes);
app.use('/api', previsionRoutes);

//Error handling
app.use((err, req, res, next) => {
    res.status(500).json({
        "message": "Algo salió mal",
        "error": err.message
    });
});

export default app;
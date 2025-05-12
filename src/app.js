//Lbrary imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';


//Import routes
import especialidadRoutes from './routes/especialidad.routes.js';
import medicoRoutes from './routes/medico.routes.js';
import pacienteRoutes from './routes/paciente.routes.js';
import previsionRoutes from './routes/prevision.routes.js';

const app = express();

//Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Demasiadas peticiones desde esta IP, por favor intente más tarde",
    standardHeaders: true,
    legacyHeaders: false,
});

// Middlewares
app.use(cors({
    origin: ['http://nicodia.dev', '*'],
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/', limiter);
app.use('/especialidad', limiter, especialidadRoutes);
app.use('/medico', limiter, medicoRoutes);
app.use('/paciente', limiter, pacienteRoutes);
app.use('/prevision', limiter, previsionRoutes);

//Error handling
app.use((err, req, res, next) => {
    res.status(500).json({
        "message": "Algo salió mal",
        "error": err.message
    });
});

export default app;
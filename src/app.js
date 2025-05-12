//Lbrary imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Import routes

const app = express();

//Middlewares
app.use(cors({
    origin: ['http://nicodia.dev', '*'],
    credentials: true
}));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes


//Error handling
app.use((err, req, res, next) => {
    res.status(500).json({
        "message": "Algo salió mal",
        "error": err.message
    });
});

export default app;
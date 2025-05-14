import bcrypt from 'bcrypt';
import { pool } from '../db.js'
import { createAccessToken } from "../libs/jwt.js";

export const signin = async (req, res) => {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    //Verificar si el usuario existe
    if (result.rows.length === 0) {
        return res.status(400).json({message: 'El correo no está registrado'});
    }

    //Verificar si la contraseña es correcta
    const validPassword = await bcrypt.compare(password, result.rows[0].password)
    if (!validPassword) {
        return res.status(400).json({message: 'La contraseña es incorrecta'});
    }

    //Generar el token de acceso
    const token = await createAccessToken({id: result.rows[0].id});
    res.cookie('token', token, {
        // httpOnly: true,
        secure: true,
        sameSite: 'none', 
        maxAge: 24 * 60 * 60 * 1000 // 1 día
    });

    return res.json(result.rows[0]);
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query('INSERT INTO users (name, email, password, gravatar) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, hashedPassword, gravatar]);
        const token = await createAccessToken({id: result.rows[0].id})

        res.cookie('token', token, {
            // httpOnly: true,
            secure: true,
            sameSite: 'none', 
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });

        return res.json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({message: 'El correo ya está en uso'});
        }
    }
};

export const signout = (req, res) => {
    // Eliminar la cookie
    res.clearCookie('token');
    res.sendStatus(200);
};

export const profile = async (req, res) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.userId]);
    return res.json(result.rows[0]);
};
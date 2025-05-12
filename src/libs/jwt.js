import jwt from 'jsonwebtoken';

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            'xha3noas',
            {
                expiresIn: '1h'
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    })
}

export const createTokenAppointment = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            'xha3noas', // Cambiar esto
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    })
}
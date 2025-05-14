import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({mensaje: 'No estás autorizado'});
    }
    jwt.verify(token, 'xha3noas', (err, decoded) => {
        if (err) {
            return res.status(401).json({mensaje: 'No estás autorizado'});
        }
        req.userId = decoded.id;
    });
    next();
};

import jwt from 'jsonwebtoken';
import { verifyToken } from '../../utilities/token';

const authMiddleware = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    let token;

    if (bearerToken && bearerToken.startsWith('Bearer')) {
        token = bearerToken.split(' ')[1];
    }

    if (!token) {
        return res.status(400).json({
            error: "Unauthorized request"
        });
    }

        const decoded=verifyToken(token);
        req.token = decoded; 
        next(); 
    
};

export default authMiddleware;

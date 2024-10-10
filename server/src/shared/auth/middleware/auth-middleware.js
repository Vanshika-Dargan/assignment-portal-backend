import jwt from 'jsonwebtoken';

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

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Invalid token:', err.message);
            return res.status(401).json({ error: "Invalid token" });
        }

        req.token = decoded; 
        next(); 
    });
};

export default authMiddleware;

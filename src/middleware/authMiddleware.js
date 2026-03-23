const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.heather['authorization'];
    const token = authHeather && authHeader.split(' ')[1]; //Bearer token
    if (!token){
        return res.status(401).json({ message: 'Token not provided' }); 
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch (error){
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
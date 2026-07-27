import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] || req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid Token" });
    }
};

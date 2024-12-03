const jwt = require('jsonwebtoken');
const JWT_SECRET = "heyabhi";

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log("Decoded data:", data);
        req.user = data.user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).send({ error: "Invalid token, authorization denied" });
    }
};

module.exports = fetchUser;
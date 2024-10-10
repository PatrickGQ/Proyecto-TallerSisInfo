import jwt from 'jsonwebtoken';

// Token: true, is a token related issue

function verifyJwT(req, res, next){
    const { token } = req.cookies;

    if(!token) return res.status(401).json({
        message: "No token authorization denied",
        token: true,
    });

    jwt.verify(token, 'SECRET', (err, decoded) => {
        if(err) return res.status(403).json({
            message: 'Invalid Token',
            token: true,
        });

        req.user = decoded;

        console.log("correct");
        
        next();
    }); 
}

export default verifyJwT;
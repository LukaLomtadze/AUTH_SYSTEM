import jwt from "jsonwebtoken"

export const verifyToken = async(req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({succsess: false, message: "Unauthorized - No token provided"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            res.status(401).json({succsess: false, message: "Unauthorized - invalid token"})
        }

        req.userId = decoded.userId;

        next();
    }catch(err){
        console.error("Error: ", err)
    }
}
import jwt from "jsonwebtoken"

export const verifyToken = async(req,res,next)=>{
    try {

        const token = req.cookies.token 
        console.log(token,"ttken")
          if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded contains { id, email, username }

    next();
        
    } catch (error) {
          return res.status(401).json({ message: "Invalid or expired token" });
        
    }
}
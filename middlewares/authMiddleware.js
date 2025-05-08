import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided in cookies" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded user info to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token", error: error.message });
  }
};

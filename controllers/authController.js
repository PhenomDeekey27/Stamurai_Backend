import User from "../models/userModel.js";
import { userDataValidation } from "../utils/userValidation.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


export const register =async(req,res)=>{

   
    try {
        
        const {name , email , password , role} = req.body

        if(!name || !email || !password) return res.status(400).json({
            message:"Every Credentials is Required"
        })

        const existingUser = await User.findOne({email})
        
        if(existingUser){
            return res.status(400).json({
                message:"Email already in use. Please try to Login"
            })
        }

        try {
            await userDataValidation({email,password,name})
            
        } catch (error) {
            console.log(error ? error : error.message)
            return res.status(400).json(error)
            
        }

        const existingUserName = await User.findOne({name})
        if(existingUserName){
            return res.status(400).json({
                message:"Username already Exist try different Username"
            })
        }

        const hashedPassword = await bcrypt.hashSync(password,+process.env.SALT_ROUND)

        try {
            const userObj = new User({
                name,email,
                password:hashedPassword,
                role
            })

            await userObj.save()


            return res.status(201).json({
                message:"User created Successfully",
                data:userObj
            })

            
        } catch (error) {
            console.log(error ? error : error.message)
            return res.status(400).json({
                message:"user creation failed",
                error:error
            })
            
            
        }

     
        
    } catch (error) {
        console.log(error,"err")
        return res.status(400).json(
            error.message
        )
        
    }

}


export const login = async (req, res) => {
  console.log("login", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All credentials are required" });

    const foundUser = await User.findOne({ email });

    if (!foundUser)
      return res.status(400).json({ message: "User not found, please register first" });

    const isPasswordValid = bcrypt.compareSync(password, foundUser.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid password, please try again" });

    const token = await jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

  
res.cookie("token", token, {
  httpOnly: true,              // ✅ must be true for middleware access
 secure: process.env.NODE_ENV === "production"               // ✅ required on HTTPS (production)
  sameSite: "none",            // ✅ required for cross-origin cookies
  path: "/",                   // ✅ ensure it's set for root
  maxAge: 7 * 24 * 60 * 60 * 1000,
});


    return res.status(200).json({
      message: "Successful login",
      data: {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        username: foundUser.username,
        role: foundUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async(req,res)=>{
    console.log("api hit")
    try {
      res.cookie("token", token, {
  httpOnly: true,              // ✅ must be true for middleware access
  secure: true,                // ✅ required on HTTPS (production)
  sameSite: "lax",            // ✅ required for cross-origin cookies
  path: "/",                   // ✅ ensure it's set for root
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
        
          return res.status(200).json({ message: "Logged out successfully" });
        
    } catch (error) {
        console.log(error ? error : error.message)
        return res.status(400).json(
            error ? error : error.message

        )
        
    }

}



export const getCurrentUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


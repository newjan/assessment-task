import jwt from "jsonwebtoken";
import { BadRequestError } from "../core/app.errors";

export const authenticateJwt = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    if(token.includes("Bearer")){
        token = token.split(' ')[1]
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.currentUser = decoded;

    next();
  } catch (ex) {
    throw new BadRequestError("Invalid Token");
  }
};

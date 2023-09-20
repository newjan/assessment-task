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
    console.log(token)
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log(decoded);
    req.user = decoded;

    next(); // Proceed to the next middleware or route
  } catch (ex) {
    throw new BadRequestError("Invalid Token");
  }
};

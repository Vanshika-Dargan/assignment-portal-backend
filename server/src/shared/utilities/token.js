import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const SECRET = process.env.JWT_SECRET;
const EXPIRY = process.env.JWT_EXPIRY;


export const generateToken = (info) => {
  return jwt.sign(
    info,
    SECRET,
    { expiresIn: EXPIRY }
  ); 
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (err) {
    throw err;
  }
};
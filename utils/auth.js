import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
  return jwt.sign(
    {
      role: user.role,
      userName: user?.userName,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

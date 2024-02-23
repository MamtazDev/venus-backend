import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
  return jwt.sign(
    { name: user.name, email: user.email, _id: user?._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const removeSensitiveInfo = (user) => {
  const { password, updatedAt, __v, createdAt, ...userWithoutPassword } =
    user.toObject();
  return userWithoutPassword;
};
  
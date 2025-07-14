import User from "../models/userSchema.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async (userData) => {
  console.log("creating user with:", userData)
  return await User.create(userData);
};

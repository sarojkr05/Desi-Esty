import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async ({ name, email, password, mobileNumber, role }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    mobileNumber: mobileNumber,
    role: role || "user", // default role is 'user'
    isApproved: role === "artisan" ? false : true, // artisans need admin approval
    isProfileComplete:false
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isProfileComplete: user.isProfileComplete,
      isApproved: user.isApproved
    },
    token,
  };
};

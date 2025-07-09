import { loginUser, registerUser } from "../services/userService.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await registerUser({ name, email, password, role });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const { user, token } = await loginUser({ email, password });

    // Set token in HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // send over HTTPS only in prod
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "Login successful",
        user,
      });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiry to past date
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logout successful" });
};

export const getCurrentUser = async (req, res) => {
  // req.user is set by the protect middleware
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { _id, name, email, role } = req.user;

  res.status(200).json({
    id: _id,
    name,
    email,
    role,
  });
};

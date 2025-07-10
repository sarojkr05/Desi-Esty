import User from "../models/userSchema.js";

export const getUnapprovedArtisans = async (req, res) => {
  const artisans = await User.find({ role: "artisan", isApproved: false });
  res.status(200).json(artisans);
};

export const approveArtisan = async (req, res) => {
  const artisan = await User.findById(req.params.id);
  if (!artisan || artisan.role !== "artisan") {
    return res.status(404).json({ message: "Artisan not found" });
  }
  artisan.isApproved = true;
  await artisan.save();
  res.status(200).json({ message: "Artisan approved" });
};

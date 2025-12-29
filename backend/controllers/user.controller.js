import User from "../models/user.model.js";

export const requestAdmin = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role !== "USER") {
    return res.status(400).json({
      message: "Only normal users can request admin"
    });
  }

  if (user.adminRequest) {
    return res.status(409).json({
      message: "Admin request already submitted"
    });
  }

  user.adminRequest = true;
  await user.save();

  res.json({ message: "Admin request submitted" });
};

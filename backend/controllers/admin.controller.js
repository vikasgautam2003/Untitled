import bcrypt from "bcrypt";
import User from "../models/user.model.js";



export const createAdmin = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "ADMIN"
        });

        res.status(201).json({
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
         });

    } catch (err) {
        console.error("Create admin error:", err);
        res.status(500).json({ message: "Failed to create admin" });
    }
}



export const listAdmins = async (_req, res) => {
  const admins = await User.find({ role: "ADMIN" }).select(
    "name email role createdAt"
  );
  res.json(admins);
};



export const removeAdmin = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if(!user)
    {
        return res.status(404).json({ message: "User not found" });
    }

    if(user.role !== "ADMIN")
    {
        return res.status(403).json({  message: "Only ADMIN users can be removed"  });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: "Admin removed successfully" });
}





export const listAdminRequests = async (_req, res) => {
  const users = await User.find({
    role: "USER",
    adminRequest: true
  }).select("name email createdAt");

  res.json(users);
};



export const approveAdminRequest = async (req, res) => {
    try{

        const { id } = req.params;

        const user = await User.findById(id);

        if(!user) {
           return res.status(404).json({ message: "User not found" }); 
        }

        if (user.role !== "USER") {
            return res.status(400).json({
                message: "Only normal users can be promoted to ADMIN"
            });
        }


        if (!user.adminRequest) {
            return res.status(400).json({
                message: "No pending admin request for this user"
            });
        }


        user.role = "ADMIN";
        user.adminRequest = false;

        await user.save();

        res.json({
            message: "User promoted to ADMIN successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Approve admin request error:", error);
        res.status(500).json({
        message: "Failed to approve admin request"
        });
   }
}
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const adminEmail = "admin@example.com";
    const adminPassword = "adminpassword123";
    const adminName = "Admin User";

    const userExists = await User.findOne({ email: adminEmail });

    if (userExists) {
      console.log("⚠️ Admin user already exists");
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      await User.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
      });
      
      console.log("🎉 Admin user created successfully");
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
    }

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();

import mongoose from "mongoose";
import config from "config";
import User from "../models/user";
import Post from "../models/post";
import Comment from "../models/comment";
import Follow from "../models/follow";

// Simple hash function used for seeding passwords (use the same method as in your auth controller)
function hashPassword(password: string): string {
  const crypto = require("crypto");
  return crypto.createHmac("sha256", config.get<string>("app.secret"))
    .update(password)
    .digest("hex");
}

const seed = async () => {
  try {
    // Connect to MongoDB (ensure you have set db.uri in your configuration)
interface MongooseConfig {
    host: string;
    port: number;
    database: string;
  }

const {host , port ,database} = config.get<MongooseConfig>("mongoose");

const dbURI = `mongodb://${host}:${port}/${database}`;
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data from collections
    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
      Follow.deleteMany({}),
    ]);

    // Seed Users
    const usersData = [
      { name: "Alice", username: "alice0", password: hashPassword("123456") },
      { name: "Bob", username: "bob000", password: hashPassword("123456") },
      { name: "Diana", username: "diana0", password: hashPassword("123456") },
      { name: "Charlie", username: "charlie", password: hashPassword("123456") },
      { name: "Gustav", username: "gustav", password: hashPassword("123456") },
    ];

    const users = await User.insertMany(usersData);
    console.log("Users seeded.");

    // Seed Posts
    const postsData = [
      {
        user: users[0]._id,
        title: "Understanding Climate Change",
        body: "Positive thinking can change your life. By focusing on the good, you can improve your mental and emotional well-being.",
        imageUrl: "https://picsum.photos/400/600",
      },
      {
        user: users[0]._id,
        title: "How to Start a Small Business",
        body: "Improving your cooking skills takes time and practice. Start with mastering the basics, and soon you'll be creating culinary masterpieces.",
        imageUrl: "https://picsum.photos/300/300",
      },
      // You can add more posts as needed...
    ];

    const posts = await Post.insertMany(postsData);
    console.log("Posts seeded.");

    // Seed Comments
    const commentsData = [
      {
        post: posts[0]._id,
        user: users[2]._id,
        body: "Social media has evolved drastically in the past decade, shaping the way we communicate and share information.",
      },
      // Add additional comments as needed...
    ];

    await Comment.insertMany(commentsData);
    console.log("Comments seeded.");

    // Seed Follows (example: Alice follows Diana, Bob, and Gustav)
    const followsData = [
      { follower: users[0]._id, followee: users[2]._id },
      { follower: users[0]._id, followee: users[1]._id },
      { follower: users[0]._id, followee: users[4]._id },
      // Add more follow relationships if needed...
    ];

    await Follow.insertMany(followsData);
    console.log("Follows seeded.");

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();

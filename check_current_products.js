import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const uri =
  process.env.MONGO_URI || "mongodb://localhost:27017/dushyant_power_tools";

mongoose
  .connect(uri)
  .then(async () => {
    const products = await mongoose.connection.db
      .collection("products")
      .find()
      .toArray();
    console.log("Current Products in DB:", JSON.stringify(products, null, 2));
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

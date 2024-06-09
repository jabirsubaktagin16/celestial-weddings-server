import dotenv from "dotenv";
import { connect, set } from "mongoose";

dotenv.config();

export const connectToMongoDB = () => {
  set("strictQuery", false);
  connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`
  )
    .then((res) => console.log("MongoDB connected"))
    .catch((err) => {
      console.log("Error in connection ", err);
    });
};

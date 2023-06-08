import mongoose from "mongoose";

const DBconnect = async () => {
  const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@talkhubdatabase.iddrloe.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useUnifiedTopology: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default DBconnect;

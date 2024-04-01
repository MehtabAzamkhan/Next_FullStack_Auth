import { Console } from "console";
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MONGGO_DB_CONNECTED");
    });

    connection.on("error", (err) => {
      console.log(
        "MONGGO_DB_CONNECTION Error, make sure db is up and running:" + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong in connection to DB");
    console.log(error);
  }
}

import config from "config";
import { connect } from "mongoose";

const URI: string = config.get("USERS_SERVICE_DB_URI");

export const initConnection = async () => {
  try {
    await connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      authSource: "admin",
    });
    console.log("Conección exitosa con la BD");
  } catch (err) {
    console.error(err);
  }
};

export default initConnection;

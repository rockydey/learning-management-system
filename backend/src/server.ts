import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(config.database_url as string);

  app.listen(config.port, () => {
    console.log(`Academix server is running on port ${config.node_env}`);
  });
}

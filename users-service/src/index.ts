import { initConnection } from "#root/db/connection";
import startServer from "#root/server/startServer";

initConnection()
  .then(() => {
    startServer();
  })
  .catch(err => {
    console.log(err);
  });

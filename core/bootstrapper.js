import express from "express";
import config from "./config.js";
import { connectToMongoDB } from "./connectors/mongoose/index.js";

const createApp = () => {
  const app = express();
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(200).send({ message: "Up and Running" });
  });
  return app;
};

const bootstrap = async (apiConfig) => {
  const app = createApp();
  app.use(apiConfig.config.ENDPOINT, apiConfig.route);

  const port = process.env.PORT || config.DEFAULT_PORT;

  connectToMongoDB();
  app.listen(port, () => console.log(`Server up and running at: ${port}`));
};

export default bootstrap;

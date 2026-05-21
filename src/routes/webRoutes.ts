import express, { Express } from "express";
import { testDB } from "../controllers/testDB";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", testDB);

  app.use("/", router); // path này là để cho biết app xuất phát từ cái nào
};

export default webRoutes;
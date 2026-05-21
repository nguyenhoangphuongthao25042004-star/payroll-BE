import express, { Express } from "express";
import { login } from "../controllers/authController";

const router = express.Router();

const authRoutes = (app: Express) => {
  router.post("/login", login); 

  app.use("/api/auth", router); 
};

export default authRoutes;
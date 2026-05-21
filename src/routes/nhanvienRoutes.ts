import express, { Express } from "express";
import { nhanVienController } from "../controllers/nhanvienController";
import { verifyToken, authorizeRole } from "../middlewares/authMiddleware";

const router = express.Router();

const nhanVienRoutes = (app: Express) => {
  // Bảo vệ các route bằng verifyToken (chỉ đăng nhập mới xem được hồ sơ)
  router.get("/", verifyToken, authorizeRole("HR"),nhanVienController.getAllEmployees);
  router.get("/search", verifyToken, authorizeRole("HR"), nhanVienController.searchEmployees);
  router.get("/:cccd", verifyToken, authorizeRole("HR"),nhanVienController.getEmployeeDetail);
  app.use("/api/nhan-vien", router);
};

export default nhanVienRoutes;
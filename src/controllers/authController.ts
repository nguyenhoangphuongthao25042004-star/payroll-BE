import { Request, Response } from "express";
import { loginService } from "../services/authService";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ten_tai_khoan, mat_khau } = req.body;

    // Validate input cơ bản
    if (!ten_tai_khoan || !mat_khau) {
      res.status(400).json({ error: "Vui lòng cung cấp tên tài khoản và mật khẩu" });
      return;
    }

    // Gọi tầng Service để xử lý logic
    const result = await loginService(ten_tai_khoan, mat_khau);
    
    // Trả về kết quả thành công
    res.json(result);
  } catch (error: any) {
    // Bắt lỗi từ Service ném ra và trả về đúng format chuẩn
    res.status(401).json({ error: "Tài khoản hoặc mật khẩu không chính xác" });
  }
};

export { login };
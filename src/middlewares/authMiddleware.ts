import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// 1. Mở rộng interface Request của Express để có thể gắn thêm thuộc tính 'user'
export interface AuthRequest extends Request {
  user?: any; // Chứa thông tin payload từ Token: id_nhan_vien, ten_tai_khoan, role...
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  // Kiểm tra: Nếu không có header hoặc không đúng chuẩn "Bearer <token>" thì đuổi về ngay
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Truy cập bị từ chối. Không tìm thấy token xác thực." });
    return;
  }

  // Tách lấy phần token nguyên bản (bỏ chữ "Bearer " ở đầu)
  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "secret";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      // Bắn đúng mã 401 để Axios Interceptor bên Frontend của bạn (làm ở bước trước) bắt được và hiện Popup
      res.status(401).json({ error: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại." });
    } else {
      res.status(401).json({ error: "Token không hợp lệ hoặc đã bị can thiệp." });
    }
  }
};


const authorizeRole = (...roles: string[]) => {
  return ( req: AuthRequest, res: Response, next: NextFunction ): void => {
    if (!req.user) {
      res.status(401).json({ error: "Bạn chưa đăng nhập."});
      return;
    }

    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      res.status(403).json({error: "Bạn không có quyền truy cập chức năng này."});
      return;
    }
    next();
  };
};


export { verifyToken, authorizeRole };
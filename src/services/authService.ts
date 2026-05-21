import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";

const loginService = async (ten_tai_khoan: string, mat_khau: string) => {
  // 1. Prisma sử dụng findUnique thay vì findByPk
  const user = await prisma.tai_khoan.findUnique({
    where: { ten_tai_khoan: ten_tai_khoan },
    include: {
      nhan_vien: true, // Lấy thông tin nhân viên (Relation)
      vai_tro: true    // Lấy thông tin phân quyền
    }
  });

  if (!user) throw new Error("Tài khoản / mật khẩu không chính xác");

  // So sánh mật khẩu băm
  const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
  if (!isMatch) {
    throw new Error("Tài khoản / mật khẩu không chính xác");
  }

  // Thuộc tính trang_thai trong CSDL là kiểu chuỗi: "HOATDONG",...
  if (user.trang_thai !== "HOATDONG") {
    throw new Error("Tài khoản / mật khẩu không chính xác");
  }
const secret = process.env.JWT_SECRET || "secret"; 
const token = jwt.sign(
  { 
    cccd: user.nhan_vien?.cccd, 
    ten_tai_khoan: user.ten_tai_khoan, 
    role: user.vai_tro?.ten_vai_tro 
  },
  secret,
  {expiresIn: "30m"}
);

  return {
    token
  };
};

export { loginService };
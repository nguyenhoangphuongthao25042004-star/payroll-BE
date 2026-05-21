import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";

const hashExistingPasswords = async () => {
  try {
    // 1. Lấy toàn bộ danh sách tài khoản từ cơ sở dữ liệu
    const accounts = await prisma.tai_khoan.findMany();
    
    console.log(`Tìm thấy ${accounts.length} tài khoản. Bắt đầu quá trình kiểm tra và mã hóa...`);

    let updatedCount = 0;

    // 2. Duyệt qua từng tài khoản để xử lý
    for (const account of accounts) {
      // 3. Kiểm tra xem mật khẩu đã được mã hóa bằng bcrypt hay chưa
      // Mã băm (hash) của bcrypt luôn có độ dài 60 ký tự và thường bắt đầu bằng "$2a$", "$2b$" hoặc "$2y$"
      const isAlreadyHashed = account.mat_khau.length === 60 && account.mat_khau.startsWith("$2");

      if (!isAlreadyHashed) {
        // 4. Thực hiện băm mật khẩu thô với tham số saltRounds = 10
        const hashedPassword = await bcrypt.hash(account.mat_khau, 10);

        // 5. Cập nhật mật khẩu đã băm trở lại cơ sở dữ liệu
        await prisma.tai_khoan.update({
          where: { id_tai_khoan: account.id_tai_khoan },
          data: { mat_khau: hashedPassword }
        });

        updatedCount++;
        console.log(`[Thành công] Đã mã hóa mật khẩu cho tài khoản: ${account.ten_tai_khoan}`);
      }
    }

    console.log(`Hoàn tất! Đã cập nhật và mã hóa thành công ${updatedCount} mật khẩu.`);
  } catch (error: any) {
    console.error("Đã xảy ra lỗi trong quá trình mã hóa:", error.message);
  } finally {
    // 6. Đóng kết nối database một cách an toàn
    await prisma.$disconnect();
  }
};

// Chạy hàm
hashExistingPasswords();
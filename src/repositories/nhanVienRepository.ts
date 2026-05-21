import { prisma } from "../config/prisma";

  // Lấy danh sách tất cả nhân viên kèm tên phòng ban
  const findAll= async () => {
    return await prisma.nhan_vien.findMany({
      include: {
        phong_ban: true,
        quyet_dinh_nhan_su: {
          orderBy: { ngay_hieu_luc: 'desc' },
          include: {
            bac_luong: {
              include: { chuc_vu: true },
            },
          },
        },
      },
    });
  }

  // Tìm chi tiết một nhân viên qua CCCD 
  const findById= async (cccd: string) => {
    return await prisma.nhan_vien.findUnique({
      where: { cccd },
      include: {
        phong_ban: true,
        tnhan_nvien: {
          include: {
            than_nhan: true,
            moi_quan_he: true,
          },
        },
        quyet_dinh_nhan_su: {
          orderBy: { ngay_hieu_luc: "desc" },
          include: {
            bac_luong: {
              include: { chuc_vu: true },
            },
          },
        },
      },
    });
  }

  const searchEmployees = async (keyword: string) => {
    return await prisma.nhan_vien.findMany({
      where: {
        OR: [
          { ho_ten: { contains: keyword } }, // Tìm theo tên
          { cccd: { contains: keyword } },   // Tìm theo CCCD
          { sdt: { contains: keyword } },    // Tìm theo số điện thoại
        ],
      },
      include: {
        phong_ban: true,
        quyet_dinh_nhan_su: {
          orderBy: { ngay_hieu_luc: "desc" },
          include: {
            bac_luong: {
              include: { chuc_vu: true },
            },
          },
        },
      },
    });
  };
  export const nhanVienRepository = { findAll, findById, searchEmployees };


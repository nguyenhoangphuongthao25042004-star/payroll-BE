import { nhanVienRepository } from "../repositories/nhanVienRepository";
import dayjs from "dayjs";

const getAllEmployees = async () => {
  const employees = await nhanVienRepository.findAll();
  
  return employees.map((emp: any) => ({
    cccd: emp.cccd,
    ho_ten: emp.ho_ten,
    vi_tri: emp.quyet_dinh_nhan_su[0]?.bac_luong?.chuc_vu.ten_chuc_vu || "Chưa bổ nhiệm",
    phong_ban: emp.phong_ban?.ten_pb || "Chưa phân bổ",
    email: emp.email,
    sdt: emp.sdt,
    ngay_sinh: emp.ngay_sinh ? dayjs(emp.ngay_sinh).format('DD/MM/YYYY') : null,
    ngay_vao_lam: emp.ngay_vao_lam ? dayjs(emp.ngay_vao_lam).format('DD/MM/YYYY') : null,
    luong_hien_tai: emp.quyet_dinh_nhan_su[0]?.bac_luong?.luong_p1 ? Number(emp.quyet_dinh_nhan_su[0].bac_luong.luong_p1) : 0,    
    trang_thai: emp.trang_thai,
  }));
}
const getEmployeeDetail = async (cccd: string) => {
    const emp = await nhanVienRepository.findById(cccd);
    
    // Ném lỗi với mã định danh rõ ràng để Controller dễ dàng phân loại status code (404)
    if (!emp) throw new Error("NOT_FOUND");

    // Mapping danh sách thân nhân
    const than_nhan = emp.tnhan_nvien.map((tn: any) => ({
      key : tn.than_nhan.ma_dinh_danh, // Sử dụng mã định danh làm key duy nhất
      ho_ten: tn.than_nhan.ten_tn,
      quan_he: tn.moi_quan_he?.ten_quan_he,
      ngay_sinh: tn.than_nhan.ngay_sinh ? dayjs(tn.than_nhan.ngay_sinh).format('DD/MM/YYYY') : null,
    }));

    // Mapping lịch sử quyết định nhân sự
    const lich_su = emp.quyet_dinh_nhan_su.map((qd: any) => ({
      so_quyet_dinh: qd.so_quyet_dinh,
      ngay_het_han: qd.ngay_het_han ? dayjs(qd.ngay_het_han).format('DD/MM/YYYY') : null,
      ngay_hieu_luc: qd.ngay_hieu_luc ? dayjs(qd.ngay_hieu_luc).format('DD/MM/YYYY') : null,
      loai_thay_doi: qd.loai_quyet_dinh,
      vi_tri: qd.bac_luong?.chuc_vu?.ten_chuc_vu || "Không rõ",
      trang_thai: qd.trang_thai,
      nguoi_ky : qd.nguoi_ky,
    }));

    return {
      thong_tin_chung: {
        cccd: emp.cccd,
        ho_ten: emp.ho_ten,
        gioi_tinh: emp.gioi_tinh,
        sdt: emp.sdt,
        email: emp.email,
        ngay_sinh: emp.ngay_sinh ? dayjs(emp.ngay_sinh).format('DD/MM/YYYY') : null,
        dan_toc: emp.dan_toc,
        dia_chi: emp.dia_chi,
        chuyen_nganh: emp.chuyen_nganh,
        ngay_nghi_viec: emp.ngay_nghi_viec ? dayjs(emp.ngay_nghi_viec).format('DD/MM/YYYY') : null,
        trang_thai: emp.trang_thai,
        so_bhxh: emp.so_bhxh,
        so_bhyt: emp.so_bhyt,
        ngay_vao_lam: emp.ngay_vao_lam ? dayjs(emp.ngay_vao_lam).format('DD/MM/YYYY') : null,
        phong_ban: emp.phong_ban?.ten_pb || "Chưa phân bổ",
        chuc_vu: emp.quyet_dinh_nhan_su[0]?.bac_luong?.chuc_vu?.ten_chuc_vu || "Chưa phân bổ",
      },
      than_nhan,
      lich_su,
    };
}

const searchEmployees = async (keyword: string) => {
  // Nếu từ khóa rỗng, có thể trả về mảng rỗng hoặc gọi lại hàm findAll tùy logic dự án
  if (!keyword || keyword.trim() === "") {
    return []; 
  }

  const employees = await nhanVienRepository.searchEmployees(keyword.trim());
  
  // Map lại dữ liệu y hệt như cấu trúc của getAllEmployees để frontend dễ xử lý
  return employees.map((emp: any) => ({
    ma_nhan_vien: emp.cccd,
    ho_ten: emp.ho_ten,
    vi_tri: emp.quyet_dinh_nhan_su[0]?.bac_luong?.chuc_vu?.ten_chuc_vu || "Chưa bổ nhiệm",
    phong_ban: emp.phong_ban?.ten_pb || "Chưa phân bổ",
    email: emp.email,
    sdt: emp.sdt,
    ngay_sinh: emp.ngay_sinh ? dayjs(emp.ngay_sinh).format('DD/MM/YYYY') : null,
    ngay_vao_lam: emp.ngay_vao_lam ? dayjs(emp.ngay_vao_lam).format('DD/MM/YYYY') : null,
    luong_hien_tai: emp.quyet_dinh_nhan_su[0]?.bac_luong?.luong_p1 ? Number(emp.quyet_dinh_nhan_su[0].bac_luong.luong_p1) : 0,    
    trang_thai: emp.trang_thai,
  }));
}

export const nhanVienService = { getAllEmployees, getEmployeeDetail,searchEmployees };
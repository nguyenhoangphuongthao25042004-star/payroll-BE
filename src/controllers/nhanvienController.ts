import { Request, Response } from "express";
import { nhanVienService } from "../services/nhanvienService";

const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const data = await nhanVienService.getAllEmployees();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeDetail = async (req: Request<{ cccd: string }>, res: Response) => {
  try {
    const { cccd } = req.params;
    const data = await nhanVienService.getEmployeeDetail(cccd);
    res.json(data);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const searchEmployees = async (req: Request<{}, {}, {}, { q?: string }>, res: Response) => {
  try {
    // Lấy từ khóa 'q' từ query URL (ví dụ: ?q=nguyen)
    const keyword = req.query.q || "";
    
    const data = await nhanVienService.searchEmployees(keyword);
    
    // Trả thẳng data về giống format của bạn
    res.json(data);
  } catch (error: any) {
    // Với search, nếu có lỗi catch được thì thường là lỗi Server/DB
    res.status(500).json({ error: error.message });
  }
};

export const nhanVienController = { getAllEmployees, getEmployeeDetail, searchEmployees };

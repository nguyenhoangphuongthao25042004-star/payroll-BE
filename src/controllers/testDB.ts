import { Request, Response } from "express";
import { testService } from "../services/test";
const testDB = async (req: Request, res: Response) => {
  //   const result = await pool.query("SELECT * FROM bac_luong");
  //   res.json(result.rows);
  const result = await testService();
  console.log(JSON.stringify(result, null, 2));
  res.json(result);
};

export { testDB };

import { prisma } from "../config/prisma";

const testService = async () => {
  const result = await prisma.bac_luong.findMany();
  return result;
};
export { testService };

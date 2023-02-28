import { NextApiHandler } from "next";
import path from "path";
import fs from "fs/promises";

const handler: NextApiHandler = async (req, res) => {
  const images = await fs.readdir(path.join(process.cwd(), "/public/images"));
  res.json(images);
};

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import formidable from "formidable";

const logoDir = path.join(process.cwd(), "public", "logos");

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadLogo = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      if (!fs.existsSync(logoDir)) {
        fs.mkdirSync(logoDir, { recursive: true });
      }

      const form = new formidable.IncomingForm({
        uploadDir: logoDir,
        keepExtensions: true,
        filename: (name, ext) => `${uuidv4()}${ext}`,
      });

      form.parse(req, (err, fields, files) => {
        if (err) {
          res.status(500).json({ message: "Error uploading file" });
        } else {
          const uploadedFile = files.logo;
          res.json({ uploadedFile });
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Error uploading file" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default uploadLogo;

import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

import dotenv from "dotenv";

dotenv.config();

const storage = new GridFsStorage({
  url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@talkhubdatabase.iddrloe.mongodb.net/?retryWrites=true&w=majority`,
  options: { useUnifiedTopology: true, useNewUrlParser: true },
  file: (req, file) => {
    const match = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "file/pdf",
      "file/doc",
    ];

    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-file-${file.originalname}`;
    }

    return {
      bucketName: "fs",
      filename: `${Date.now()}-file-${file.originalname}`,
    };
  },
});

export default multer({ storage });

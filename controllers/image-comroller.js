import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "http://localhost:5000";

const conn = mongoose.connection;

let gfs, gridFsBucket;
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(404).json("file never found");
  }

  const imageUrl = `${url}/file/${req.file.filename}`;
  return res.status(200).json(imageUrl);
};

export const getFile = async (req, res) => {
  try {
    const fileName = req.params.filename;
    const file = await gfs.files.findOne({ filename: fileName });

    if (!file) {
      return res.status(404).json("File not found");
    }

    const readStream = gridFsBucket.openDownloadStreamByName(fileName);
    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

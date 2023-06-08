import express from "express";
import { addUser, getUsers } from "../controllers/controllers.js";
import {
  newConversation,
  getConversation,
} from "../controllers/conversation-controller.js";
import { newMessage, getMessages } from "../controllers/message-controller.js";
import { uploadFile, getFile } from "../controllers/image-comroller.js";
import upload from "../utils/upload.js";

const route = express.Router();

route.post("/add", addUser);
route.get("/users", getUsers);

route.post("/conversations/add", newConversation);
route.post("/conversations/get", getConversation);

route.post("/message/add", newMessage);
route.get("/message/get/:id", getMessages);

route.post("/file/upload", upload.single("file"), uploadFile);
route.get("/file/:filename", getFile);

export default route;

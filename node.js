const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { sequelize } = require("./db");
const router = require("./router/index");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const storageConfig = multer.diskStorage({
  destination: (req, photo, cb) => {
    cb(null, "uploads");
  },
  filename: (req, photo, cb) => {
    const uniqueSuffix = uuidv4(); // генерируем уникальный идентификатор
    const fileExtension = photo.originalname.split(".").pop(); // расширение файла
    const filename = `${uniqueSuffix}.${fileExtension}`;
    req.body.photo = filename;
    cb(null, filename);
  },
});
app.use(express.static(__dirname));
app.use(multer({ storage: storageConfig }).single("photo"));

PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api", router);

const server = require("http").createServer(app);

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
};

start();

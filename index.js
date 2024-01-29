const express = require("express");
const mongoose = require("mongoose");
// const cors = require("cors");
const routerApi = require("./routes");
const multer = require("multer");
const path = require("path");
const { config } = require("./config/config");

// const {
//   logErrors,
//   errorHandler,
//   boomErrorHandler,
//   ormErrorHandler,
// } = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/files"),
  filename: (req, file, cb, filename) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));

// const whitelist = [config.whiteList];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("no permitido"));
//     }
//   },
// };
// app.use(cors(options));

require("./utils/auth");

routerApi(app);

// app.use(logErrors);
// app.use(ormErrorHandler);
// app.use(boomErrorHandler);
// app.use(errorHandler);

mongoose
  .connect(config.mongodbUri)
  .then(() => console.log("Connected to mongoDB!"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log("Listening on port: " + port);
});

/** @format */

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadItem = upload.single(fieldName);
    uploadItem(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).send({ Multimessage: err.message });
      } else if (err) {
        return res.status(400).send({ NormalMsg: err.message });
      }

      // Everything went fine.
      next();
    });
  };
};

const uploadMultiple = (fileCount, fieldName) => {
  return (req, res, next) => {
    const uploadItems = upload.array(fieldName, fileCount);
    uploadItems(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).send({ message: err.message });
      } else if (err) {
        return res.status(400).send({ NormalMsg: err.message });
      }

      // Everything went fine.
      next();
    });
  };
};

module.exports = { uploadSingle, uploadMultiple };

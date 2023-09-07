const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/temp/image");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      req.fileValidationError = "Only jpg and jpeg file type are allowed!";
      return cb(new Error("Only jpg and png file type are allowed!"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

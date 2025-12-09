const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Crop + Save middleware
async function handleImageCrop(req, res, next) {
  if (!req.file) return next();

  try {
    const uploadDir = path.join(__dirname, "..", "uploads");

    // ✅ Create upload folder if not exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const filename = `${Date.now()}-${req.file.originalname.replace(/\s+/g, "-")}`;
    const outPath = path.join(uploadDir, filename);

    await sharp(req.file.buffer)
      .resize(450, 350, { fit: "cover" })
      .toFile(outPath);

    // ✅ store relative path
    req.file.savedPath = `/uploads/${filename}`;

    next();
  } catch (err) {
    console.error("Image crop error:", err);
    res.status(500).json({ error: "Image processing failed" });
  }
}

module.exports = {
  uploadSingle: upload.single("image"),
  handleImageCrop,
};

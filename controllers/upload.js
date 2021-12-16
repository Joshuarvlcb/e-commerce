const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImage = async (req, res) => {
  const response = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
    fs.unlinkSync(req.files.image.tempFilePath);
  res.status(200).json({ image: { src: response } });
};

module.exports = {
  uploadProductImage,
};
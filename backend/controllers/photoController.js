const Photo = require("../models/Photo");

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const photo = await Photo.create({
      image: req.file.path,
      caption: req.body.caption,
      creator: req.creator.id
    });

    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyPhotos = async (req, res) => {
  const photos = await Photo.find({ creator: req.creator.id });
  res.json(photos);
};

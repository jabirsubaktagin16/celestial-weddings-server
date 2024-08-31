import Gallery from "./gallery.js";

const addImage = (body) => {
  const newImage = new Gallery(body);
  return newImage.save();
};

const getAllImages = () => Gallery.find();

const deleteImage = (imageId) => Gallery.deleteOne({ _id: imageId });

export const GalleryController = {
  addImage,
  getAllImages,
  deleteImage,
};

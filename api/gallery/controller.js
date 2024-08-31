import Gallery from "./gallery.js";

const addImage = (body) => {
  const newImage = new Gallery(body);
  return newImage.save();
};

const getAllImages = () => Gallery.find();

const deleteImage = async (imageId) => {
  return Gallery.findByIdAndDelete(imageId);
};

export const GalleryController = {
  addImage,
  getAllImages,
  deleteImage,
};

import _Package from "../package/package.js";
import Vendor from "./vendor.js";

const createVendor = (body) => {
  const vendor = new Vendor(body);
  return vendor.save();
};

const getAllVendors = () => Vendor.find();

const deleteVendor = (id) => {
  const vendor = Vendor.findById(id);

  if (!vendor) {
    console.log(`Vendor with ID ${id} not found`);
    return;
  }

  // Delete all packages associated with the vendorId
  _Package.deleteMany({ vendorId: id });

  console.log(`Vendor ${id} and associated packages deleted successfully`);

  // Delete the vendor itself
  return Vendor.deleteOne({ _id: id });
};

const updateVendor = (id, body) => {
  const vendor = new Vendor(body);
  return Vendor.updateOne(
    { _id: id },
    {
      $set: {
        name: vendor.name,
        category: vendor.category,
        cover: vendor.cover,
        phoneNumber: vendor.phoneNumber,
        address: vendor.address,
        description: vendor.description,
        updatedAt: new Date(),
      },
    }
  );
};

const getVendorByCategory = (categoryName) =>
  Vendor.find({ category: categoryName });

const getVendorById = (id) => Vendor.findById(id);

export const VendorController = {
  createVendor,
  getVendorByCategory,
  getVendorById,
  getAllVendors,
  deleteVendor,
  updateVendor,
};

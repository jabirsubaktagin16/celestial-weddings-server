import Vendor from "../vendor/vendor.js";
import Package from "./package.js";

const createPackage = (body) => {
  const newPackage = new Package(body);
  return newPackage.save();
};

const viewAllPackagesForVendor = (vendorId) =>
  Package.find({ vendorId: vendorId }).populate("vendorId");

const getAllPackages = () => Package.find();

const updatePackage = (body) => {
  const packageFind = new Package(body);
  return Package.updateOne(
    { _id: body._id },
    {
      $set: {
        name: packageFind.name,
        price: packageFind.price,
        servicesOffered: [packageFind.servicesOffered],
        discountStatus: packageFind.discountStatus,
        discountPercentage: packageFind.discountPercentage,
        updatedAt: Date.now,
      },
    }
  );
};

const deletePackage = async (vendorId, packageId) => {
  Vendor.findByIdAndUpdate(vendorId, {
    $pull: { packages: packageId },
  });

  return Package.findByIdAndDelete(packageId);
};

export const PackageController = {
  createPackage,
  viewAllPackagesForVendor,
  getAllPackages,
  updatePackage,
  deletePackage,
};

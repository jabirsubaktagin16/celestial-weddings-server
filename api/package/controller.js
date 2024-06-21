import Vendor from "../vendor/vendor.js";
import Package from "./package.js";

const createPackage = (vendorId, body) => {
  const newPackage = new Package(body);
  const savedPackage = newPackage.save();

  Vendor.findByIdAndUpdate(vendorId, {
    $push: { packages: savedPackage._id },
  });

  return savedPackage;
};

const viewAllPackagesForVendor = (vendorId) =>
  Vendor.findById(vendorId).populate("packages");

const getAllPackages = () => Package.find();

const getPackagesByTags = (serviceName) =>
  Package.find({ tags: { $all: serviceName } });

const updatePackage = (body) => {
  const packageFind = new Package(body);
  return Package.updateOne(
    { _id: body._id },
    {
      $set: {
        name: packageFind.name,
        price: packageFind.price,
        cover: packageFind.cover,
        description: packageFind.description,
        servicesOffered: [packageFind.servicesOffered],
        tags: [packageFind.tags],
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
  getPackagesByTags,
  updatePackage,
  deletePackage,
};

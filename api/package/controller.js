import Package from "./package.js";

const createPackage = (body) => {
  const newPackage = new Package(body);
  return newPackage.save();
};

const getPackageDetails = (packageId) => Package.findOne({ _id: packageId });

const viewAllPackagesForVendor = (vendorId) =>
  Package.find({ vendorId: vendorId }).populate("vendorId");

const getAllPackages = () => Package.find();

const updatePackage = (id, body) => {
  const packageFind = new Package(body);
  return Package.updateOne(
    { _id: id },
    {
      $set: {
        name: packageFind.name,
        price: packageFind.price,
        servicesOffered: packageFind.servicesOffered,
        discountStatus: packageFind.discountStatus,
        discountPercentage: packageFind.discountPercentage,
        updatedAt: Date.now(),
      },
    }
  );
};

const deletePackage = (packageId) => Package.deleteOne({ _id: packageId });

export const PackageController = {
  createPackage,
  getPackageDetails,
  viewAllPackagesForVendor,
  getAllPackages,
  updatePackage,
  deletePackage,
};

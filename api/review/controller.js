import mongoose from "mongoose";
import Review from "./review.js";

const createReview = (body) => {
  const review = new Review(body);
  return review.save();
};

const getVendorRatings = (vendorId) => {
  return new Promise((resolve, reject) => {
    // Fetch ratings distribution
    Review.aggregate([
      { $match: { vendorId: new mongoose.Types.ObjectId(vendorId) } }, // Filter by vendorId
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 }, // Count how many times each rating occurs
        },
      },
    ])
      .then((ratings) => {
        // Count total reviews
        Review.countDocuments({
          vendorId: new mongoose.Types.ObjectId(vendorId),
        })
          .then((totalReviews) => {
            // Calculate average rating
            Review.aggregate([
              { $match: { vendorId: new mongoose.Types.ObjectId(vendorId) } }, // Filter by vendorId
              {
                $group: {
                  _id: null,
                  average: { $avg: "$rating" }, // Calculate the average rating
                },
              },
            ])
              .then((averageRatingResult) => {
                // Ensure ratings array has valid data
                const ratingsMap = {
                  1: 0,
                  2: 0,
                  3: 0,
                  4: 0,
                  5: 0,
                };

                // Populate ratingsMap with actual values from aggregation
                ratings.forEach((rating) => {
                  ratingsMap[rating._id] = rating.count;
                });

                // Calculate average rating (default to 0 if no reviews exist)
                const averageRating =
                  averageRatingResult.length > 0
                    ? averageRatingResult[0].average.toFixed(2)
                    : 0;

                // Create the rating distribution object
                const ratingDistribution = {
                  totalReviews,
                  ratings: ratingsMap,
                  averageRating: averageRating,
                };

                // Resolve the Promise with the rating distribution
                resolve(ratingDistribution);
              })
              .catch((error) =>
                reject(`Error calculating average rating: ${error}`)
              );
          })
          .catch((error) => reject(`Error counting total reviews: ${error}`));
      })
      .catch((error) => reject(`Error fetching ratings: ${error}`));
  });
};

export const ReviewController = {
  createReview,
  getVendorRatings,
};

import Review from "./review.js";

const createReview = (body) => {
  const review = new Review(body);
  return review.save();
};

export const ReviewController = {
  createReview
};

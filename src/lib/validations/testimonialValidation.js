export const validateTestimonial = (data) => {
  if (!data.name?.trim()) {
    return "Name is required!";
  }

  if (!data.desc?.trim()) {
    return "Testimonial description is required!";
  }

  if (data.rating === undefined || data.rating === null || data.rating === "") {
    return "Rating is required!";
  }

  const rating = Number(data.rating);

  if (rating < 1 || rating > 5) {
    return "Rating must be between 1 and 5!";
  }

  if (data.image && typeof data.image !== "string") {
    return "Image must be a valid URL!";
  }

  if (data.designation && typeof data.designation !== "string") {
    return "Designation must be a string!";
  }

  if (data.company && typeof data.company !== "string") {
    return "Company must be a string!";
  }

  return null;
};
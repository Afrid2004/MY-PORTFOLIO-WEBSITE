
export const validateBlog = (data) => {
  if (!data.title?.trim()) {
    return "Blog title is required!";
  }

  if (!data.slug?.trim()) {
    return "Blog slug is required!";
  }

  if (!data.category?.trim()) {
    return "Blog category is required!";
  }

  if (!data.excerpt?.trim()) {
    return "Blog excerpt is required!";
  }

  if (!data.content?.trim()) {
    return "Blog content is required!";
  }

  if (!data.readTime?.trim()) {
    return "Read time is required!";
  }

  if (!Array.isArray(data.tags)) {
    return "Tags must be an array!";
  }

  if (!Array.isArray(data.keywords)) {
    return "Keywords must be an array!";
  }

  return null;
};

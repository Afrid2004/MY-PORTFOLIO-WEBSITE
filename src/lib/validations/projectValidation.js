export function validateProject(data) {
  // Title
  if (!data.title || !data.title.trim()) {
    return "Project title is required!";
  }

  // Description
  if (!data.description || !data.description.trim()) {
    return "Description is required!";
  }

  // Category
  if (!data.category || !data.category.trim()) {
    return "Category is required!";
  }

  // Technologies
  if (!Array.isArray(data.technologies)) {
    return "Technologies must be an array!";
  }

  // Check technology name
  for (const technology of data.technologies) {
    if (!technology.name || !technology.name.trim()) {
      return "Technology name is required!";
    }
  }

  // Project Status
  if (!data.projectStatus || !data.projectStatus.trim()) {
    return "Project status is required!";
  }

  // Published Date
  if (!data.publishedDate) {
    return "Published date is required!";
  }

  return null;
}

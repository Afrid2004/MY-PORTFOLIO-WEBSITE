export function validateService(data) {
  const { title, description, icon } = data;

  if (!title || typeof title !== "string" || !title.trim()) {
    return "Please enter service title!";
  }

  if (!description || typeof description !== "string" || !description.trim()) {
    return "Please enter service description!";
  }

  if (!icon || typeof icon !== "string" || !icon.trim()) {
    return "Please enter icon name!";
  }

  return null;
}

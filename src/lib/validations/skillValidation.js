export function validateSkill(data) {
  const { name, category, level, color, icon, status } = data;
  if (!name || typeof name !== "string" || !name.trim()) {
    return "Please enter skill name!";
  }

  if (!icon || typeof icon !== "string" || !icon.trim()) {
    return "Please enter icon name!";
  }

  const validCategories = ["frontend", "backend", "database", "tools_other"];

  if (!category || !validCategories.includes(category)) {
    return "Please select a valid category!";
  }

  const skillLevel = Number(level);
  if (
    level === "" ||
    level === undefined ||
    Number.isNaN(skillLevel) ||
    skillLevel < 0 ||
    skillLevel > 100
  ) {
    return "Skill level must be between 0 and 100!";
  }

  if (!color || typeof color !== "string" || !color.trim()) {
    return "Please enter skill color!";
  }

  return null;
}

export function validateEducation(data) {
  const {
    degree,
    institution,
    startDate,
    endDate,
    current,
    academicHighlights,
    coursework,
    skillsDeveloped,
  } = data;

  if (!degree || typeof degree !== "string" || !degree.trim()) {
    return "Please enter degree!";
  }

  if (!institution || typeof institution !== "string" || !institution.trim()) {
    return "Please enter institution name!";
  }

  if (!startDate || typeof startDate !== "string" || !startDate.trim()) {
    return "Please enter start date!";
  }

  if (
    !current &&
    (!endDate || typeof endDate !== "string" || !endDate.trim())
  ) {
    return "Please enter end date!";
  }

  if (!Array.isArray(academicHighlights)) {
    return "Academic highlights must be an array!";
  }

  if (!Array.isArray(coursework)) {
    return "Coursework must be an array!";
  }

  if (!Array.isArray(skillsDeveloped)) {
    return "Skills developed must be an array!";
  }

  return null;
}

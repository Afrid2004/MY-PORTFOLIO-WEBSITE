export function validateWorkExperience(data) {
  const {
    role,
    company,
    startDate,
    endDate,
    current,
    address,
    addressUrl,
    responsibilities,
    technologies,
  } = data;

  if (!role || typeof role !== "string" || !role.trim()) {
    return "Please enter job role!";
  }

  if (!company || typeof company !== "string" || !company.trim()) {
    return "Please enter company name!";
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

  if (!address || typeof address !== "string" || !address.trim()) {
    return "Please enter address!";
  }

  if (
    !addressUrl ||
    typeof addressUrl !== "string" ||
    !addressUrl.trim()
  ) {
    return "Please enter address URL!";
  }

  if (!Array.isArray(responsibilities)) {
    return "Responsibilities must be an array!";
  }

  if (!Array.isArray(technologies)) {
    return "Technologies must be an array!";
  }

  return null;
}
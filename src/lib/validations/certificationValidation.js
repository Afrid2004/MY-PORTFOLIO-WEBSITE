
export function validateCertification(data) {
  // Title
  if (!data.title || !data.title.trim()) {
    return "Certification title is required!";
  }

  // Issuer
  if (!data.issuer || !data.issuer.trim()) {
    return "Issuer is required!";
  }

  // Duration
  if (!data.duration || !data.duration.trim()) {
    return "Duration is required!";
  }

  // Highlights
  if (!Array.isArray(data.highlights)) {
    return "Highlights must be an array!";
  }

  // Technologies
  if (!Array.isArray(data.technologies)) {
    return "Technologies must be an array!";
  }

  return null;
}

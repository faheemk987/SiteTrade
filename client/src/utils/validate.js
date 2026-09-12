// Simple reusable validation helpers used across forms.

export function isRequired(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
}

export function isPositiveNumber(value) {
  const num = Number(value);
  return !Number.isNaN(num) && num > 0;
}

export function minLength(value, length) {
  return (value || "").length >= length;
}

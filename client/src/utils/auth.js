export function getStoredAuth() {
  try {
    const raw = localStorage.getItem("sitetrade_auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem("sitetrade_auth");
}

export function isAuthenticated() {
  const token = getStoredAuth()?.token;

  if (!token) return false;

  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return false;

    const base64Payload = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64Payload.padEnd(Math.ceil(base64Payload.length / 4) * 4, "=")));
    return !payload.exp || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
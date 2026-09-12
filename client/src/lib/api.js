const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem("sitetrade_auth");
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed?.token ? parsed : null;
  } catch {
    return null;
  }
};

const request = async (method, endpoint, body) => {
  const auth = getStoredAuth();

  const headers = {
    "Content-Type": "application/json",
  };

  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : { success: false, message: await response.text() };

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload.data ?? payload;
};

export const api = {
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, body) => request("POST", endpoint, body),
  put: (endpoint, body) => request("PUT", endpoint, body),
  delete: (endpoint) => request("DELETE", endpoint),
};

// src/lib/auth.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = (endpoint: string, options: RequestInit = {}) => {
  return fetch(`${API_BASE_URL}${endpoint}`, options);
};

// Fungsi untuk menyimpan data auth ke localStorage
export const saveAuthData = (token: string, user: object, roles: string[], permissions: string[]) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("roles", JSON.stringify(roles));
  localStorage.setItem("permissions", JSON.stringify(permissions));
};

// Fungsi untuk mengambil data auth
export const getAuthData = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const roles = localStorage.getItem("roles");
  const permissions = localStorage.getItem("permissions");

  return {
    token,
    user: user ? JSON.parse(user) : null,
    roles: roles ? JSON.parse(roles) : [],
    permissions: permissions ? JSON.parse(permissions) : [],
  };
};

// Fungsi untuk cek apakah user sudah login
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};
export function clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("roles");
  localStorage.removeItem("permissions");
}

// Tambahkan di auth.ts
export const authorizedFetch = (endpoint: string, options: RequestInit = {}) => {
  const { token } = getAuthData();

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
};

// Fungsi logout
export const logout = () => {
  localStorage.clear();
  window.location.href = "/login-company";
};

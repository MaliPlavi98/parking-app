import http from "./http";

// Get all settings
export function getSettings() {
  return http("GET", "/api/setting");
}

// Create a new setting
export function createSetting(data, token) {
  return http("POST", "/api/setting", data, token);
}

// Update a specific setting by ID
export function updateSetting(id, data, token) {
  return http("PUT", `/api/setting/${id}`, data, token);
}

// Delete a specific setting by ID
export function deleteSetting(id, token) {
  return http("DELETE", `/api/setting/${id}`, null, token);
}

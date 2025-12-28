import http from "./http";

// Get all settings
export function getSettings() {
  return http("GET", "/api/setting");
}

export function getSettingByKey(key) {
  return http("GET", `/api/setting/${key}`);
}

// Create a new setting
export function createSetting(data) {
  return http("POST", "/api/setting", data);
}

// Update a specific setting by ID
export function updateSetting(id, data) {
  return http("PUT", `/api/setting/${id}`, data);
}

// Delete a specific setting by ID
export function deleteSetting(id) {
  return http("DELETE", `/api/setting/${id}`);
}

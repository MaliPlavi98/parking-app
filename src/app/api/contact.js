import http from "./http";

// Create a new contact message
export function sendContactMessage(data) {
  return http("POST", "/api/contact", data);
}

// Get all contact messages
export function getAllContactMessages() {
  return http("GET", "/api/contact/admin");
}

// Delete a contact message by ID
export function deleteContactMessage(id) {
  return http("DELETE", `/api/contact/admin/${id}`);
}

// Delete a contact message by ID
export function updateContactMessage(id, data) {
  return http("PUT", `/api/contact/admin/${id}`, data);
}
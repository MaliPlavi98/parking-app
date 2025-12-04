import http from "./http";

// Create a new contact message
export function sendContactMessage(data) {
  return http("POST", "/api/contact", data);
}

// Get all contact messages
export function getAllContactMessages() {
  return http("GET", "/api/contact");
}

// Delete a contact message by ID
export function deleteContactMessage(id) {
  return http("DELETE", `/api/contact/${id}`);
}
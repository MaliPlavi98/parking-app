import http from "./http";

// Create new reservation
export function createReservation(data, token) {
  return http("POST", "/api/reservation", data, token);
}

// Get all reservations
export function getAllReservations(token) {
  return http("GET", "/api/reservation", null, token);
}

// Delete reservation by ID
export function cancelReservation(id, token) {
  return http("DELETE", `/api/reservation/${id}`, null, token);
}

// Check availability
export function checkAvailability(data, token) {
  return http("POST", "/api/reservation/check", data, token);
}
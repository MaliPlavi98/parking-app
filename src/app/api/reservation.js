import http from "./http";

// Create new reservation
export function createReservation(data) {
  return http("POST", "/api/reservation", data);
}

// Get all reservations
export function getAllReservations() {
  return http("GET", "/api/reservation");
}

// Delete reservation by ID
export function cancelReservation(id) {
  return http("DELETE", `/api/reservation/${id}`);
}

export function updateReservation(id, data) {
  return http("PUT", `/api/reservation/${id}`, data);
}


// Check availability
export function checkAvailability(data) {
  return http("POST", "/api/reservation/check", data);
}
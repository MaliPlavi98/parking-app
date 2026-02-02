import http from "./http";

// Create new reservation
export function createReservation(data) {
  return http("POST", "/api/reservation", data);
}

// Get all reservations
export function getAllReservations() {
  return http("GET", "/api/reservation/admin");
}

export function getReservationById(id) {
  return http("GET", `/api/reservation/${id}`);
}

// Delete reservation by ID
export function cancelReservation(id) {
  return http("DELETE", `/api/reservation/admin/${id}`);
}

export function updateReservation(id, data) {
  return http("PUT", `/api/reservation/admin/${id}`, data);
}


// Check availability
export function checkAvailability(data) {
  return http("POST", "/api/reservation/check", data);
}
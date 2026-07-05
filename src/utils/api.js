// Paste your deployed Google Apps Script Web App URL here (ends in /exec).
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx5IjyiUYOvI3TW7-SSqLCrM-AP8Z5mE4clG6fKvWdqO_qUi2czSWbph12YON73QSxp/exec";

/**
 * POST helper. Sends body as text/plain (not application/json) — this is
 * a deliberate workaround: Apps Script Web Apps don't handle CORS
 * preflight (OPTIONS) requests, and browsers only skip preflight for
 * "simple" requests, which requires a simple Content-Type like text/plain.
 * The Apps Script side still parses the body as JSON normally.
 */
async function postAction(payload) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

async function getAction(params) {
  const url = new URL(APPS_SCRIPT_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function submitRSVP({ name, email, guests, attending, message }) {
  return postAction({ action: "rsvp", name, email, guests, attending, message });
}

export function getGuestStatus(id) {
  return getAction({ action: "status", id });
}

export function searchGuests(query) {
  return getAction({ action: "search", q: query });
}

export function checkInGuest(id) {
  return postAction({ action: "checkin", id });
}

export function manualCheckInGuest(id, staffName) {
  return postAction({ action: "manualCheckin", id, staffName });
}
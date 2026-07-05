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
export function sendMessage({ name, email, message }) {
  return postAction({ action: "message", name, email, message });
}


function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Compresses an image client-side before upload so guest photos stay fast
 * to send even on slow connections. Resizes to a max dimension and
 * re-encodes as JPEG at moderate quality.
 */
function compressImage(file, maxDimension = 1600, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > height && width > maxDimension) {
        height = Math.round((height * maxDimension) / width);
        width = maxDimension;
      } else if (height > maxDimension) {
        width = Math.round((width * maxDimension) / height);
        height = maxDimension;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => resolve(blob),
        "image/jpeg",
        quality
      );
    };
    img.onerror = reject;
    img.src = url;
  });
}

export async function uploadGuestPhoto({ name, caption, file }) {
  const compressedBlob = await compressImage(file);
  const imageBase64 = await fileToBase64(compressedBlob);
  return postAction({ action: "uploadPhoto", name, caption, imageBase64, mimeType: "image/jpeg" });
}

export function listGuestPhotos() {
  return getAction({ action: "listPhotos" });
}
// frontend/src/utils/session.js
// Ensure a stable sessionId for guest users (UUID simple)
export function getSessionId() {
  let s = localStorage.getItem('sessionId');
  if (!s) {
    s = generateId();
    localStorage.setItem('sessionId', s);
  }
  return s;
}
function generateId() {
  // simple UUIDv4-ish
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
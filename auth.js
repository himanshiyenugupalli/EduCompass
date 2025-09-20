const USER_STORAGE_KEY = 'educompass_users';
const LOGGED_IN_USER_KEY = 'educompass_logged_in_user';

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
}

function loadUsers() {
  const usersJSON = localStorage.getItem(USER_STORAGE_KEY);
  return usersJSON ? JSON.parse(usersJSON) : {};
}

function saveUsers(users) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
}

function setLoggedInUser(email) {
  localStorage.setItem(LOGGED_IN_USER_KEY, email);
}

function getLoggedInUser() {
  return localStorage.getItem(LOGGED_IN_USER_KEY);
}

function clearLoggedInUser() {
  localStorage.removeItem(LOGGED_IN_USER_KEY);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function clearAllErrors(errorIds) {
  errorIds.forEach(id => clearError(id));
}

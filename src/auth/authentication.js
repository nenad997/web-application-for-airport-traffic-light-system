function getAuthToken() {
  const token = localStorage.getItem("authToken");
  return token;
}

export function getToken() {
  const authToken = getAuthToken();
  if (!authToken) {
    return null;
  }
  return authToken;
}

export function getExpirationTime() {
  const expirationTime = localStorage.getItem("expirationTime");
  if (!expirationTime) {
    return null;
  }
  return +expirationTime;
}

export function getLoggedInUserId() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

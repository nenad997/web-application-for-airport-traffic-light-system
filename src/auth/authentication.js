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

export function getUserData() {
  const username = localStorage.getItem("username");
  const currentTime = localStorage.getItem("currentTime");

  const data = {};

  if (username) {
    data["username"] = username;
  }

  if (currentTime) {
    data["currentTime"] = currentTime;
  }

  return data;
}

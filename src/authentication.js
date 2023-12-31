function getAuthToken() {
  const token = localStorage.getItem("authToken");
  return token;
}

export function getToken() {
  const authToken = getAuthToken();
  if (!authToken) {
    return;
  }
  return authToken;
}

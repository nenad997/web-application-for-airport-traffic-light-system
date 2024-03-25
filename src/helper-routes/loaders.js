import { redirect } from "react-router-dom";

import { getLoggedInUserId } from "../auth/authentication";

export function loginLoader({ request, params }) {
  console.log(request);
  console.log(params);
  return redirect("/");
}

export async function profileLoader() {
  const loggedInUserId = getLoggedInUserId();

  if (!loggedInUserId) {
    return redirect("/auth?mode=login");
  }
  return redirect("/auth?mode=login");
}

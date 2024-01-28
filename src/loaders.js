import { redirect } from "react-router-dom";

export function loginLoader({ request, params }) {
  console.log(request);
  console.log(params);
  return redirect("/");
}

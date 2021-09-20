export default function({ store, route, redirect }) {
  if (route.name !== "login" && route.fullPath !== "/signUp") {
    redirect("/login");
  }
}

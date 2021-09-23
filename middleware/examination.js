export default function({ store, route, redirect }) {
  if (
    // storeのstateを設定しておいて条件分岐
    store.state.login === false &&
    route.name !== "login" &&
    // 例外として表示可能なページを指定
    route.fullPath !== "/signUp"
  ) {
    redirect("/login");
  }
}

import { register, init, getLocaleFromNavigator } from "svelte-i18n";

register("es", () => import("./locale/es.json"));
register("en", () => import("./locale/en.json"));

init({
  fallbackLocale: "es",
  initialLocale: getLocaleFromNavigator(),
});

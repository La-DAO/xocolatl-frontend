import { register, init, getLocaleFromNavigator } from "svelte-i18n";

register("es", () => import("../public/static/locale/es.json"));
register("en", () => import("../public/static/locale/en.json"));

init({
  fallbackLocale: "es",
  initialLocale: getLocaleFromNavigator(),
});

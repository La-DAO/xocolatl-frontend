import { register, init, getLocaleFromNavigator } from "svelte-i18n";

register("Es", () => import("../public/static/locale/es.json"));
register("En", () => import("../public/static/locale/en.json"));

init({
  fallbackLocale: "es",
  initialLocale: getLocaleFromNavigator(),
});

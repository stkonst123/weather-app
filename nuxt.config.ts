// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtConfig } from "@nuxt/types";

const config: NuxtConfig = {
  buildModules: ["@nuxt/typescript-build"],
  devtools: { enabled: false },
  modules: ["nuxt-quasar-ui"],
  ssr: false,
};

export default config;

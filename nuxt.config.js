// import Vue from 'vue';

// Vue.use(Mijin);
// const test = require ("devextreme/dist/css/dx.light.css");
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "testdatatable",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["devextreme/dist/css/dx.light.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["primevue/nuxt"],
  // module: {
  //   rules: [
  //     {
  //       test: /\.s[ac]ss$/i,
  //       use: [
  //         "style-loader",
  //         "css-loader",
  //         {
  //           loader: "sass-loader",
  //           options: {
  //             // Prefer `dart-sass`
  //             implementation: require("sass"),
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["primevue"],
  },

  primevue: {
    components: ["DataTable", "Column", "Row", "ColumnGroup"],
  },
};

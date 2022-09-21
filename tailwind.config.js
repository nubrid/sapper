/* eslint-disable unicorn/no-abusive-eslint-disable, immutable/no-mutation */
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== "development",
    content: [
      "./src/routes/**/*.html",
      "./src/routes/**/*.svelte",
      "./src/components/**/*.html",
      "./src/components/**/*.svelte",
    ],
    options: {
      safelist: [/svelte-/],
      defaultExtractor: (content) => content.match(/[\w/:-]+/g) || [], // NOTE: /[A-Za-z0-9-_:/]+/g) || [],
    },
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}

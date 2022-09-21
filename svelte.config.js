// NOTE: Required as option in svelte-loader on both server and client webpack config
const sveltePreprocess = require("svelte-preprocess")

// eslint-disable-next-line immutable/no-mutation
module.exports = {
  preprocess: sveltePreprocess({
    sourceMap: process.env.NODE_ENV === "development",
    // TODO: Revisit https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-setting-default-languages
    // defaults: {
    //   markup: "pug",
    //   script: "javascript",
    //   style: "postcss",
    // },
  }),
  // NOTE: https://github.com/sveltejs/svelte-loader/issues/67#issuecomment-706740142
  // onwarn: (warning, handleWarning) =>
  //   (warning.code === "MISSING_EXPORT" && /'preload'/.test(warning.message)) ||
  //   (warning.code === "CIRCULAR_DEPENDENCY" &&
  //     /[/\\]@sapper[/\\]/.test(warning.message)) ||
  //   /Unused CSS selector/.test(warning.message) ||
  //   handleWarning(warning),
  // TODO: ...other svelte options
}

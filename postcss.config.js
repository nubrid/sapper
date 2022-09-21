// eslint-disable-next-line immutable/no-mutation
module.exports = {
  plugins: [
    // TODO: Revisit require("postcss-import")(),
    require("precss")(),
    require("tailwindcss")(),
    require("autoprefixer")(),
  ],
}

/* eslint-disable max-lines, immutable/no-mutation */
// NOTE: const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const customModuleRules = [
  // TODO: Add babel
  // {
  //   test: /\.(js|mjs)$/,
  //   loader: "babel-loader",
  //   exclude: /node_modules\/(?!svelte)/,
  //   options: {
  //     presets: [
  //       [
  //         "@babel/env",
  //         {
  //           loose: true,
  //           modules: false,
  //         },
  //       ],
  //     ],
  //     plugins: [],
  //   },
  // },
  {
    test: /\.(scss|pcss|css)$/i,
    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
  },
]
const customPlugins = [new MiniCssExtractPlugin()] // NOTE: , new BundleAnalyzerPlugin()]
const customClientOptions = {
  // fast; original source (lines only)
  // devtool:
  //   process.env.NODE_ENV === "development" && "eval-cheap-module-source-map",
  // faster; transformed code (lines only)
  devtool: process.env.NODE_ENV === "development" && "eval-cheap-source-map",
}

// NOTE: SAPPER (20201017)
const webpack = require("webpack")
const WebpackModules = require("webpack-modules")
const path = require("path")
const config = require("sapper/config/webpack.js")
const pkg = require("./package.json")

const mode = process.env.NODE_ENV
const dev = mode === "development"

const alias = { svelte: path.resolve("node_modules", "svelte") }
const extensions = [".mjs", ".js", ".json", ".svelte", ".html"]
const mainFields = ["svelte", "module", "browser", "main"]
const fileLoaderRule = {
  test: /\.(png|jpe?g|gif)$/i,
  use: ["file-loader"],
}

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: { alias, extensions, mainFields },
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: "svelte-loader",
            options: {
              dev,
              hydratable: true,
              hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
              ...require("./svelte.config"), // NOTE: SAPPER (20201017)
            },
          },
        },
        fileLoaderRule,
        ...customModuleRules, // NOTE: SAPPER (20201017)
      ],
    },
    mode,
    plugins: [
      // pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      ...customPlugins, // NOTE: SAPPER (20201017)
    ].filter(Boolean),
    devtool: dev && "inline-source-map",
    ...customClientOptions, // NOTE: SAPPER (20201017)
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: "node",
    resolve: { alias, extensions, mainFields },
    externals: Object.keys(pkg.dependencies).concat("encoding"),
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: "svelte-loader",
            options: {
              css: false,
              generate: "ssr",
              hydratable: true,
              dev,
              ...require("./svelte.config"), // NOTE: SAPPER (20201017)
            },
          },
        },
        fileLoaderRule,
        ...customModuleRules, // NOTE: SAPPER (20201017)
      ],
    },
    mode,
    plugins: [new WebpackModules(), ...customPlugins], // NOTE: SAPPER (20201017)
    performance: {
      hints: false, // it doesn't matter if server.js is large
    },
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode,
  },
}

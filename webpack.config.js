const webpack = require("webpack")
const WebpackModules = require("webpack-modules")
// TODO:REVIEW const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
// TODO:REVIEW const CleanPlugin = require("clean-webpack-plugin")
// TODO:REVIEW const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")
const config = require("sapper/config/webpack.js")
const pkg = require("./package.json")

const { scss } = require("svelte-preprocess")

const mode = process.env.NODE_ENV
const dev = mode === "development"
const hotReload = dev && process.env.HOT != 0

const alias = { svelte: path.resolve("node_modules", "svelte") }
const extensions = [".mjs", ".js", ".json", ".svelte", ".html"]
const mainFields = ["svelte", "module", "browser", "main"]

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: { alias, extensions, mainFields },
    module: {
      rules: [
        {
          test: /\.(js|mjs)$/,
          loader: "babel-loader",
          exclude: /node_modules\/(?!svelte)/,
          options: {
            presets: [
              [
                "@babel/env",
                {
                  loose: true,
                  modules: false,
                },
              ],
            ],
            plugins: [],
          },
        },
        {
          test: /\.(svelte|html)$/,
          exclude: /node_modules\/(?!svelte)/,
          use: [
            "babel-loader",
            {
              loader: "svelte-loader-hot",
              options: {
                dev, // NOTE: dev mode is REQUIRED for HMR
                hydratable: true,
                hotReload,
                hotOptions: {
                  optimistic: true,
                },
              },
            },
          ],
        },
      ],
    },
    mode,
    plugins: [
      // TODO:REVIEW https://github.com/sveltejs/svelte/issues/3632
      hotReload && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
    ].filter(Boolean),
    devtool: dev && "inline-source-map",
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
            // NOTE: you don't need svelte-loader-hot here, but it avoids having to also install svelte-loader
            loader: "svelte-loader-hot",
            options: {
              css: false,
              generate: "ssr",
              dev,
            },
          },
        },
      ],
    },
    mode,
    plugins: [new WebpackModules()],
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

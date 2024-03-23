//importing the necessary modules 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    //entry point for files
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    //output for the bundles
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      //Webpack plugin that generates the main html file
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "J.A.T.E",
      }),
      //injects the custom service worker.
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      //generate a web app manifest file
      new WebpackPwaManifest({
        //not adding hashes to the filename 
        fingerprints: false,
        //manifest file injected into the HTML file 
        inject: true,
        name: "text-editor: J.A.T.E",
        short_name: "J.A.T.E",
        description: "text editor that works without internet connection!",
        background_color: "#dedaf4",
        theme_color: "#ffcbcb",
        //root directory for the starting and public path 
        start_url: "./",
        publicPath: "./",
        //icons for the app 
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      //CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

const devConfig = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        open: false,
        historyApiFallback: true,
        static: {
            directory: path.resolve("public"),
        },
        port: 3000,
    },
});

module.exports = devConfig;

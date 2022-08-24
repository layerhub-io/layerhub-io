const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const prodConfig = merge(common, {
    mode: "production",
    devtool: "source-map",
});

module.exports = prodConfig;

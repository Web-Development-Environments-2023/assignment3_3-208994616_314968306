module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};

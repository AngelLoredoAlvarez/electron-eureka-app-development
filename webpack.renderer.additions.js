module.exports = {
  devServer: {
    historyApiFallback: process.env.NODE_ENV === "development"
  }
};

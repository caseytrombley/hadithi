module.exports = {
  configureWebpack: {
    plugins: [],
    resolve: {
      fallback: {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "stream": require.resolve("stream-browserify"),
        "timers": require.resolve("timers-browserify")
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: "@import \"@/scss/base.scss\";"
      }
    }
  }
};

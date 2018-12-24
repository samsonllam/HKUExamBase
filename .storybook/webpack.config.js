const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        // 這是套件 addon-storysource 所需要的 webpack 設定
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre'
      },
      {
        // pug 設置
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
		// stylus 設置
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
	  // nuxt 預設的 alias 有 '@', '@@', '~', '~~' 但是本人只有在用 '@', 有需要可以自己再加。
      '@': path.dirname(path.resolve(__dirname))
    }
  }
};
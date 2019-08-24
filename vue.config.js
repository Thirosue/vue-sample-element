module.exports = {
  devServer: {
    proxy: {
      '^/admin': {
        target: 'http://localhost:18081',
      },
    },
  },
};

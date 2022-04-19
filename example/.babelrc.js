module.exports = {
  comments: false,
  presets: [['@babel/preset-env', {
    useBuiltIns: false,
    targets: {
      node: 'current'
    }
  }]],
  sourceMaps: true
};

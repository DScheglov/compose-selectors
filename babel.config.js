module.exports = {
  presets: [
    [
      '@babel/env', {
        targets: {
          browsers: [
            'last 2 versions'
          ]
        },
        loose: true
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
  ]
};

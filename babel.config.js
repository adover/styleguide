module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        modules: 'commonjs',
      },
    ],
  ];

  const env = {
    test: {
      plugins: [
        [
          require('@babel/plugin-proposal-decorators').default,
          {
            legacy: true,
          },
        ],
        'require-context-hook',
      ],
    },
  };

  return {
    presets,
    env,
  };
};

import babel from '@rollup/plugin-babel'

const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'bundle.js',
      format: 'esm',

      globals: {
        '@babel/runtime/regenerator': 'regeneratorRuntime',
      },
    },
  ],

  plugins: [
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      plugins: [
        '@babel/plugin-transform-async-to-generator',
        '@babel/plugin-transform-regenerator',
        [
          '@babel/plugin-transform-runtime',
          {
            helpers: true,
            regenerator: true,
          },
        ],
      ],
      presets: ['@babel/preset-env'],
      exclude: '**/node_modules/**',
    }),
  ],
}

export default config

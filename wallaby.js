module.exports = wallaby => {
  return {
    files: ['src/**/*', 'jest.config.js', 'tsconfig.json'],

    tests: ['test/**/*.spec.ts'],

    env: {
      type: 'node',
      runner: 'node',
    },

    preprocessors: {
      '**/*.js?(x)': file =>
        require('babel-core').transform(file.content, {
          sourceMap: true,
          compact: false,
          filename: file.path,
          plugins: ['transform-es2015-modules-commonjs'],
        }),
    },

    setup(wallaby) {
      const jestConfig = require('./jest.config.js')

      jestConfig.moduleNameMapper = {
        '^@/components/([^\\.]*)$':
          wallaby.projectCacheDir + '/src/components/$1.vue',
        '^@/(.*)$': wallaby.projectCacheDir + '/src/$1',
      }

      delete jestConfig.transform['^.+\\.tsx?$']

      wallaby.testFramework.configure(jestConfig)
    },

    testFramework: 'jest',
  }
}

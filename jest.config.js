module.exports = {
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'node'],

  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/tests/**/*.(js)', '**/?(*.)+(spec).(js)'],

  // An array of regexp pattern strings that are matched against all test paths,
  // matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/src/setupTests.js'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
};

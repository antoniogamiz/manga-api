module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputName: "junit-TEST.xml",
      },
    ],
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      functions: 0,
      lines: 0,
    },
  },
};

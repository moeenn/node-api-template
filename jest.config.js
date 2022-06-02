// const { defaults } = require("jest-config")
const aliases = require("module-alias-jest/register")

/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
	moduleNameMapper: aliases.jest,
  // moduleFileExtensions: [...defaults.moduleFileExtensions, "ts"],
  modulePathIgnorePatterns: ["<rootDir>/build/"],
};

const fs = require("fs");
const path = require("path");

// Define the new purge path to add
const newPurgePath =
  "./node_modules/@tony-nz/vue-form-generator/src/**/*.{vue,js,jsx,ts,tsx}";

// Resolve the path to the tailwind.config.js file using the project root as the base directory
const configPath = path.resolve(process.cwd(), "tailwind.config.js");

// Read the existing configuration from the file
let config = {};
if (fs.existsSync(configPath)) {
  config = require(configPath);
}

// Check if the `purge` key exists in the config, and add it if it does not
if (!config.purge) {
  config.purge = [];
}

// Add the new purge path to the `purge` array
config.purge.push(newPurgePath);

// Write the updated configuration back to the file
fs.writeFile(
  configPath,
  `module.exports = ${JSON.stringify(config, null, 2)};\n`,
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("tailwind.config.js updated!");
    }
  }
);

var ini = require('ini');
var fs = require('fs');

// Find the path to the .config.ini file
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

let config = {};

// Check if the config file exists
if (!fs.existsSync(`${appDir}/.config.ini`)) {
    console.log('Config file not found, using environment variables');
    
    // Parse config.ini from the root directory but actually use environment variables
    if (Object.keys(config).length === 0) {
        config = ini.parse(fs.readFileSync(`${appDir}/config.ini`, 'utf-8'));
        for (let key in config) {
            config[key] = process.env[key];
        }
    }
}
else {
    config = ini.parse(fs.readFileSync(`${appDir}/.config.ini`, 'utf-8'));
}
console.log(config)

module.exports = config;
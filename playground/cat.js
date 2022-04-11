const fs = require('fs');
const path = require('path')

// console.log(process.cwd());
// filepath = path.join(process.cwd(),process.argv[2])
// console.log(filepath);
fs.readdirSync(process.cwd());
// console.log(fs.readFileSync(filepath, 'ascii'));
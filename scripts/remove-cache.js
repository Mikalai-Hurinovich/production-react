const fs = require('fs');
const path = require('path');

const cachePath = path.join(__dirname, '..', 'node_modules/.cache');
if (fs.existsSync(cachePath)) {
    fs.rmdirSync(cachePath, { recursive: true });
}

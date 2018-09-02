const ShopbackSEOParser = require('./models/shopback-seo-parser');

module.exports = ShopbackSEOParser;
if (module.id === '.') {
    parser();
}

async function parser() {
    let parser = new (require('.'))();
    const filePath = './demo/template.html';

    // Stream
    const fs = require('fs');
    fs.createReadStream(filePath)
        .pipe(parser)
        .pipe(process.stdout);
        
    //File path
    await parser.parse('./demo/template.html');
}
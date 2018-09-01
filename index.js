const ShopbackSEOParser = require('./models/shopback-seo-parser');
let shopbackSEOParser = new ShopbackSEOParser();

module.exports = shopbackSEOParser;
if (module.id === '.') {
    parser();
}

async function parser() {
    let parser = require('.');
    const filePath = './demo/template.html';

    // // //Steam
    const fs = require('fs');
    fs.createReadStream(filePath)
        .pipe(parser)
        .pipe(process.stdout);
        
    //File path
    await parser.parse('./demo/template.html');
    console.log('done!!!!');
}
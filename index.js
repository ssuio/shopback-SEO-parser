const ShopbackSEOParser = require('./models/shopback-seo-parser');
let shopbackSEOParser = new ShopbackSEOParser();

module.exports = shopbackSEOParser;
if (module.id === '.') {
    
    // var fs = require("fs");
    // fs.createReadStream('./test/template.html')
    //     .pipe(parser);
    parser();
}

async function parser(){
    let parser = require('.');
    await parser.parse('./demo/template.html');
    console.log('done!');
}
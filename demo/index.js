const path = require('path');
// let shopbackSEOParser = new ShopbackSEOParser();

if (module.id === '.') {
    parser();
}

async function parser() {
    const filePath = path.join(__dirname, './template.html');
    const parser = new (require('../'))();

    //Steam
    const fs = require('fs');
    fs.createReadStream(filePath)
        .pipe(parser)
        .pipe(process.stdout);

    // //File path
    // let result = await parser.parse(filePath);
    // console.log(result);
    // console.log('finished');
}
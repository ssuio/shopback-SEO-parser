const path = require('path');
const fs = require('fs');
const templates = require('../test/templates');
// let shopbackSEOParser = new ShopbackSEOParser();

if (module.id === '.') {
    generateDemoTemplate();
    parser();
}

function generateDemoTemplate() {
    for (let key in templates) {
        fs.writeFile(path.join(__dirname, `./${key}.html`), templates[key], () => {});
    }
}

async function parser() {
    const filePath = path.join(__dirname, './template4.html');
    const parser = new (require('../'))();

    // //Steam
    // const fs = require('fs');
    // fs.createReadStream(filePath)
    //     .pipe(parser)
    //     .pipe(process.stdout);

    //File path
    let result = await parser.parse(filePath);
    console.log(result);
    console.log('finished');
}
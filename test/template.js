const jade = require('jade');

function compileJadeArr(jadeArr) {
    return jade.compile(jadeArr.join('\n'))();
}

const template1 = compileJadeArr([
    "html",
    "  head",
    "    title",
    "    meta(name='descriptions')",
    "    meta(name='keywords' value='hot')",
    "    title",
    "  body",
    "    meta(name='In body')",
    "    h1 hello"
]);

module.exports = {
    template1: template1
};
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

const template2 = compileJadeArr([
    "html",
    "  head",
    "    meta(name='descriptions')",
    "    meta(name='keywords' value='hot')",
    "    title",
    "  body",
    "    meta(name='In body')",
    "    h1 hello",
    "    h1 hello"
]);

const template3 = compileJadeArr([
    "html",
    "  head",
    "    meta(name='descriptions')",
    "    meta(name='keywords' value='hot')",
    "    title",
    "  body",
    "    meta(name='In body')",
    "    h1 hello",
    "    h1 hello"
]);

const template4 = compileJadeArr([
    "html",
    "  head",
    "    meta(name='descriptions')",
    "    meta(name='keywords' value='hot')",
    "    title",
    "  body",
    "    meta(name='In body')",
    "    h1 hello",
    "    h1 hello"
]);

const template5 = compileJadeArr([
    "html",
    "  head",
    "    meta(name='descriptions')",
    "    meta(name='keywords' value='hot')",
    "    title",
    "  body",
    "    meta(name='In body')",
    "    h1 hello",
    "    h1 hello"
]);

module.exports = {
    template1,
    template2,
    template3,
    template4,
    template5,
};
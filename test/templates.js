/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/**
 * Module dependency.
 */

const jade = require('jade');

function compileJadeArr(jadeArr) {
    return jade.compile(jadeArr.join('\n'))();
}

/**
 * Test pre-defined-rules.
*/

const template1 = compileJadeArr([
    "html",
    "  head",
    "    meta(name='descriptions')",
    "    meta(name='keywords')",
    "    meta()",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    a",
    "  body",
    "    img",
    "    img(alt)",
    "    a",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    strong",
    "    meta(name='In body')",
    "    meta(name='description')",
    "    h1 hello"
]);

/**
 * Test customized-rules.
*/

const template2 = compileJadeArr([
    "html",
    "  head",
    "    meta(name='descriptions')",
    "    meta(name='')",
    "    title(name='')",
    "  meta(name='keywords')",
    "  title(name='keywords' value='hot')",
    "  h1(name='keywords' value='hot')",
    "  title",
    "  body",
    "    meta(name='In body')",
    "    h1 hello",
    "    img",
    "    img(alt)",
    "    img(alt)",
    "    a(alt)"
]);

const template3 = compileJadeArr([
    "html",
    "  head",
    "    meta(name='descriptions')",
    "    meta(name='keywords' value='hot')",
    "    title",
    "    span s1",
    "    span s1",
    "    span s1",
    "  body",
    "    input(type='checkbox')",
    "    input(type='radio')",
    "    input(type='')",
    "    span s1",
    "    span s1",
    "    span s1",
    "    select(ng-repeat='a in b')",
    "    span s1",
    "    span s1",
    "    span s1",
    "    span s1",
    "    select(type='')",
    "    input(type='')",
    "    label(text='age')",
    "    label(note='text')",
]);

const template4 = compileJadeArr([
    "html",
    "  head",
    "    meta(name='descriptions')",
    "    meta(name='keywords' value='hot')",
    "    span s1",
    "    span s1",
    "    span s1",
    "    h6 s1",
    "    h6 s1",
    "    h6 s1",
    "    h6 s1",
    "    h6 s1",
    "    span s1",
    "    span s1",
    "    span s1",
    "    span s1",
    "    span s1",
    "    title",
    "    input(type='checkbox')",
    "    input(type='radio')",
    "  body",
    "    meta(name='In body')",
    "    h1 hello",
    "    h1 hello",
    "      input(type='checkbox')",
    "      input(type='radio')",
]);

module.exports = {
    template1,
    template2,
    template3,
    template4
};
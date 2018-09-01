/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/**
 * Module dependency.
 */

const util = require('util');
const Parser = require("htmlparser2").Parser;

/**
 * Constructor.
 */

function HTMLParser(control){
    Parser.call(this, control, { decodeEntities: true });
}

/**
 * Inherit prototype.
 */

util.inherits(HTMLParser ,Parser);

module.exports = HTMLParser;
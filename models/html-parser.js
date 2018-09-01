var Parser = require("htmlparser2").Parser;
const util = require('util');

/**
 * Constructor.
 */

function HTMLParser(control){
    Parser.call(this, {
        onopentag: function (name, attrs) {
            // if (name == 'meta' && attrs.name == 'descriptions') {
            console.log(`name:${name}`);
            console.log(`attr:${attrs.name}`);
            // }
        },
        ontext: function (text) {
            // console.log("-->", text);
        },
        onclosetag: function (tagname) {
            if (tagname === "script") {
                // console.log("That's it?!");
            }
        },
        onend: function () {
            control.onEnd();
        }
    }, { decodeEntities: true });
}

/**
 * Inherit prototype.
 */

util.inherits(HTMLParser ,Parser);

module.exports = HTMLParser;
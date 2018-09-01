/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/**
* Module dependencies.
*/

const util = require('util');
const fs = require('fs');
const Transform = require('stream').Transform;
const ConfigError = require('../error/config-error');
const preDefinedRules = require('../rules/pre-defined-rules');
const HTMLparser = require('./html-parser');
const RulesHandler = require('./rules-handler');
const out = require('./result-parser');

/**
 * Constructor.
 */

function ShopbackSEOParser(options) {
    const self = this;
    options = options || {};
    if (options.defaultRules) {
        var defaultRulesNums = options.defaultRules;
        if (!Array.isArray(defaultRulesNums)) {
            throw new ConfigError('Setup default rules must give a number array.');
        } else {
            self.rules = [];
            defaultRulesNums.forEach(num => {
                self.rules.push(preDefinedRules[num - 1]);
            });
        }
    } else if (options.rules && Array.isArray(options.rules)) {
        self.rules = options.rules;
    } else {
        self.rules = preDefinedRules;
    }
    if (!Array.isArray(this.rules)) {
        throw new ConfigError('Rules must be an array.');
    }
    Transform.call(this, { decodeStrings: false });
}

/**
 * Inherit prototype.
 */

util.inherits(ShopbackSEOParser, Transform);

/**
 * General parse func by file path.
 */

ShopbackSEOParser.prototype.parse = function (filePath) {
    const self = this;
    if (!filePath) {
        throw new ConfigError('Must config a filepath.');
    }
    fs.createReadStream(filePath)
        .pipe(this);
    return new Promise((resolve, reject) => {
        self.on('error', () => {
            reject();
        });
        self.on('end', (result) => {
            resolve(result);
        });
    });
};

/**
 * Make this parser pipable.
 */

ShopbackSEOParser.prototype._transform = function (chunk, _encoding, done) {
    const self = this;
    const rulesHandler = new RulesHandler(self.rules);
    const scope = [];
    let htmlParser = new HTMLparser({
        onopentag: function (name, attrs) {
            scope.push(name);
            rulesHandler.verify(scope, name, attrs);
        },
        onclosetag: function (name) {
            scope.pop(name);
        },
        onend: function () {
            self.emit('end', out.parseResult(rulesHandler.rules));
        }
    });
    htmlParser.write(chunk.toString());
    done(null, out.parseResult(rulesHandler.rules));
    htmlParser.end();
};

module.exports = ShopbackSEOParser;
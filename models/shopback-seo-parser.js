/**
 * @author Noah Chou <xssuio@gmail.com>
 */

const util = require('util');
const fs = require('fs');
const Transform = require('stream').Transform;
// const EventEmitter = require('events').EventEmitter; 
const ConfigError = require('../error/config-error');
const preDefinedRules = require('../rules/pre-defined-rules');
const HTMLparser = require('./html-parser');
const RulesHandler = require('./rules-handler');
const out = require('./result-parser');

/**
 * Constructor.
 */

function ShopbackSEOParser() {
    this.rules = preDefinedRules;

    Transform.call(this, { decodeStrings: false });
}

/**
 * Inherit prototype.
 */

util.inherits(ShopbackSEOParser, Transform);


ShopbackSEOParser.prototype.setup = function (options) {
    options = options || {};
    if (options.rules && Array.isArray(options.rules)) {
        this.rules.concat(options.rules);
    } else {
        throw new ConfigError('Rules must be an array.');
    }
    return this;
};

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
        self.on('end', () => {
            resolve();
        });
    });
};

/**
 * Parser be pipable.
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
            self.emit('end');
        }
    });
    htmlParser.write(chunk.toString());
    console.log(rulesHandler.rules);
    done(null, out.parseResult(rulesHandler.rules));
    htmlParser.end();
};

module.exports = ShopbackSEOParser;
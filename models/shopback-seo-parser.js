/**
 * @author Noah Chou <xssuio@gmail.com>
 */

const util = require('util');
const fs = require('fs');
const Transform = require('stream').Transform;
const EventEmitter = require('events').EventEmitter; 
const ConfigError = require('../error/config-error');
const preDefinedRules = require('../rules/pre-defined-rules');
let HTMLparser = require('./html-parser');

/**
 * Constructor.
 */

function ShopbackSEOParser() {
    this.rules = preDefinedRules;

    EventEmitter.call(this);
    Transform.call(this, {decodeStrings: false});
}

/**
 * Inherit prototype.
 */

util.inherits(ShopbackSEOParser ,EventEmitter);
util.inherits(ShopbackSEOParser ,Transform);


ShopbackSEOParser.prototype.setRules = function (rules) {
    if (rules && Array.isArray(rules)) {
        this.rules.concat(rules);
    } else {
        throw new ConfigError('Rules must be an array.');
    }
    return this;
};

ShopbackSEOParser.prototype.parse = function (filePath) {
    const self = this;
    fs.createReadStream(filePath)
        .pipe(this);
    return new Promise((resolve, reject) => {
        self.on('error', ()=>{
            reject();
        });
        self.on('end', ()=>{
            resolve();
        });
    });
};

/**
 * Parser be pipable.
 */

ShopbackSEOParser.prototype._transform = function (chunk, _encoding, done) {
    const self = this;
    let htmlParser = new HTMLparser({
        onEnd: ()=>{
            self.emit('end');
        }
    });
    done(null, htmlParser.write(chunk.toString()));
    htmlParser.end();
};

module.exports = ShopbackSEOParser;
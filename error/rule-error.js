/**
 * @author Noah Chou <xssuio@gmail.com>
 */

const util = require('util');
const ShopbackSEOError = require('./sb-seo-error');

/**
 * Constructor.
 */

function RuleError(message){
    ShopbackSEOError.call(this, message);
}

/**
 * Inherit prototype.
 */

util.inherits(RuleError, ShopbackSEOError);

module.exports = RuleError;
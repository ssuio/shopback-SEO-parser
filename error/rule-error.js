const util = require('util');
const ShopbackSEOError = require('./sb-seo-parser-error');

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
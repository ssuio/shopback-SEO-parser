const util = require('util');
const ShopbackSEOError = require('./sb-seo-error');

/**
 * Constructor.
 */

function ParseResultError(message) {
    ShopbackSEOError.call(this, message);
}

/**
 * Inherit prototype.
 */

util.inherits(ParseResultError, ShopbackSEOError);

module.exports = ParseResultError;
const util = require('util');

/**
 * Constructor.
 */

function ShopbackSEOError(message){
    this.message = message;
}

/**
 * Inherit prototype.
 */

util.inherits(ShopbackSEOError, Error);

module.exports = ShopbackSEOError;


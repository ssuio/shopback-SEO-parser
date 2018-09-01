/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/**
 * Module dependency.
 */

const util = require('util');
const ShopbackSEOError = require('./sb-seo-error');

/**
 * Constructor.
 */

function ConfigError(message){
    ShopbackSEOError.call(this, message);
}

/**
 * Inherit prototype.
 */

util.inherits(ConfigError, ShopbackSEOError);

module.exports = ConfigError;
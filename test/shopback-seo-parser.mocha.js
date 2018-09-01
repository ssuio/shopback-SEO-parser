/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/* global describe it */

const assert = require('chai').assert;
const ConfigError = require('../error/config-error');

describe('models/shopback-seo-parser - general behavior', function () {
    let ShopbackSEOParser;
    it('Unset ShopbackSEOParser', function(){
        try {
            ShopbackSEOParser = require('../index');
            ShopbackSEOParser.parse();
            assert.fail();
        } catch (err) {
            assert.equal(true, err instanceof ConfigError);
            assert.equal('Rules not found.', err.message);
        }
    });
    it('Set ShopbackSEOParser', function(){
        try {
            ShopbackSEOParser = require('../index');
            ShopbackSEOParser.parse();
            assert.fail();
        } catch (err) {
            assert.equal(true, err instanceof ConfigError);
            assert.equal('Rules not found.', err.message);
        }
    });
});
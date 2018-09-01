/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/* global describe it */

const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');
const ConfigError = require('../error/config-error');
const filePath = path.join(__dirname, '../demo/template.html');

describe('models/shopback-seo-parser - general behavior', function () {
    let ShopbackSEOParser = require('../index');
    it('Unset ShopbackSEOParser', function () {
        try {
            ShopbackSEOParser.parse();
            assert.fail();
        } catch (err) {
            assert.equal(true, err instanceof ConfigError);
            assert.equal('Must config a filepath.', err.message);
        }
    });
    it('Parse Promise by filepath ShopbackSEOParser', function (done) {
        ShopbackSEOParser.parse(filePath)
            .then(() => done())
            .catch(() => assert.fail());
    });
    it('Pipe to ShopbackSEOParser', function (done) {
        ShopbackSEOParser.on('end', () => {
            done();
        });
        fs.createReadStream(filePath)
            .pipe(ShopbackSEOParser)
            .pipe(process.stdout);
    });
});
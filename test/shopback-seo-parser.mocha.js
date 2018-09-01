/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/* global describe it */

const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');
const ConfigError = require('../error/config-error');
const filePath = path.join(__dirname, '../demo/template.html');
const customizeRules = require('./customize-rules');

describe('models/shopback-seo-parser - general behavior', function () {
    let ShopbackSEOParser = require('../index');
    it('Unset ShopbackSEOParser', () => {
        try {
            let parser = new ShopbackSEOParser();
            parser.parse();
            assert.fail();
        } catch (err) {
            assert.equal(true, err instanceof ConfigError);
            assert.equal('Must config a filepath.', err.message);
        }
    });
    it('Parse Promise by filepath ShopbackSEOParser', (done) => {
        let parser = new ShopbackSEOParser();
        parser.parse(filePath)
            .then(() => done())
            .catch(() => assert.fail());
    });
    it('Pipe to ShopbackSEOParser', function (done) {
        let parser = new ShopbackSEOParser();
        parser.on('end', () => {
            done();
        });
        fs.createReadStream(filePath)
            .pipe(parser)
            .pipe(process.stdout);
    });
    it('Customize rules by ShopbackSEOParser', function (done) {
        let parser = new ShopbackSEOParser();
        parser
            .setup({ rules: customizeRules })
            .parse(filePath)
            .then(() => done())
            .catch(() => assert.fail());
    });
});
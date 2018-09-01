/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/* global describe it */

const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');
const ConfigError = require('../error/config-error');
const filePath = path.join(__dirname, '../demo/template.html');
const customizeRules = require(path.join(__dirname, '../rules/customize-rules'));

describe('models/shopback-seo-parser - general behavior', () => {
    const ShopbackSEOParser = require('../index');
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
    it('Pipe to ShopbackSEOParser', (done) => {
        let parser = new ShopbackSEOParser();
        parser.on('end', () => {
            done();
        });
        fs.createReadStream(filePath)
            .pipe(parser)
            .pipe(process.stdout);
    });
    it('Customize rules by ShopbackSEOParser', (done) => {
        let parser = new ShopbackSEOParser({ rules: customizeRules });
        parser
            .parse(filePath)
            .then(() => done())
            .catch(() => assert.fail());
    });
});

describe('models/shopback-seo-parser - verify pre-defined-rules result', async () => {
    const ShopbackSEOParser = require('../index');
    it('Parser parse on template.html', async () => {
        let parser = new ShopbackSEOParser();
        let result = await parser.parse(path.join(__dirname, '../demo/template.html'));
        assert.equal([
            'There are 1 <img> tag with alt attribute.',
            'There are 1 <a> tag without rel attribute.',
            'This HTML dosen\'t have more than 15 <strong> tag.',
            'This HTML dosen\'t have more than 1 <H1> tag.',
            'There are 1 <title> tag in head tag.',
            'This HTML does have 1 <meta> tag with name attribute descriptions value in head tag.',
            'This HTML does have 3 <meta> tag without name attribute keywords value in head tag.',
        ].join('\n'), result);
    });

    it('Parser parse on template1.html', async () => {
        let parser = new ShopbackSEOParser();
        let result = await parser.parse(path.join(__dirname, '../demo/template1.html'));
        assert.equal([
            'There are 1 <img> tag with alt attribute.',
            'There are 2 <a> tag without rel attribute.',
            'This HTML have more than 15 <strong> tag.',
            'This HTML dosen\'t have more than 1 <H1> tag.',
            'There are 0 <title> tag in head tag.',
            'This HTML does have 1 <meta> tag with name attribute descriptions value in head tag.',
            'This HTML does have 2 <meta> tag without name attribute keywords value in head tag.',
        ].join('\n'), result);
    });

    it('Parser parse on template2.html', async () => {
        let parser = new ShopbackSEOParser();
        let result = await parser.parse(path.join(__dirname, '../demo/template2.html'));
        assert.equal([
            'There are 2 <img> tag with alt attribute.',
            'There are 1 <a> tag without rel attribute.',
            'This HTML dosen\'t have more than 15 <strong> tag.',
            'This HTML have more than 1 <H1> tag.',
            'There are 1 <title> tag in head tag.',
            'This HTML does have 1 <meta> tag with name attribute descriptions value in head tag.',
            'This HTML does have 2 <meta> tag without name attribute keywords value in head tag.',
        ].join('\n'), result);
    });
});

describe('models/shopback-seo-parser - verify specific pre-defined-rules result', async () => {
    const ShopbackSEOParser = require('../index');
    it('Parser parse on template.html', async () => {
        let parser = new ShopbackSEOParser({
            defaultRules: [1, 3, 5]
        });
        let result = await parser.parse(path.join(__dirname, '../demo/template.html'));
        assert.equal([
            'There are 1 <img> tag with alt attribute.',
            'There are 1 <title> tag in head tag.',
            'This HTML does have 3 <meta> tag without name attribute keywords value in head tag.',
        ].join('\n'), result);
    });

    it('Parser parse on template1.html', async () => {
        let parser = new ShopbackSEOParser({
            defaultRules: [5, 6]
        });
        let result = await parser.parse(path.join(__dirname, '../demo/template1.html'));
        assert.equal([
            'This HTML have more than 15 <strong> tag.',
            'This HTML does have 2 <meta> tag without name attribute keywords value in head tag.',
        ].join('\n'), result);
    });

});

describe('models/shopback-seo-parser - verify customize-rules result', async () => {
    const ShopbackSEOParser = require('../index');
    it('Parser parse on template.html', async () => {
        let parser = new ShopbackSEOParser({
            rules: customizeRules
        });
        let result = await parser.parse(path.join(__dirname, '../demo/template3.html'));
        assert.equal([
            'This HTML does have 1 <input> tag with type attribute checkbox value.',
            'This HTML dosen\'t have less than 9 <span> tag.',
            'There are 2 <select> tag.',
            'There are 2 <label> tag in body tag.',
            'There are 0 <h6> tag with name attribute 666 value in head tag.',
        ].join('\n'), result);
    });

    it('Parser parse on template4.html', async () => {
        let parser = new ShopbackSEOParser({
            rules: customizeRules
        });
        let result = await parser.parse(path.join(__dirname, '../demo/template4.html'));
        assert.equal([
            'This HTML does have 2 <input> tag with type attribute checkbox value.',
            'This HTML have less than 9 <span> tag.',
            'There are 0 <select> tag.',
            'There are 0 <label> tag in body tag.',
            'There are 0 <h6> tag with name attribute 666 value in head tag.',
        ].join('\n'), result);
    });
});
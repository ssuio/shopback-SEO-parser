/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/* global describe it */

const assert = require('chai').assert;

const mockResults = [
    {
        tag: {
            include: 'img',
        },
        attrs: {
            exclude: {
                alt: undefined
            }
        },
        count: 1
    },
    {
        tag: {
            include: 'a',
        },
        attrs: {
            exclude: {
                rel: 'someStr'
            }
        },
        count: 0
    }, {
        scope: 'head',
        tag: {
            exclude: 'title',
        },
        count: 0
    }, {
        tag: {
            include: 'strong',
        },
        count: 4,
        condition: {
            '>': 3
        }
    }, {
        tag: {
            include: 'p',
        },
        count: 1,
        condition: {
            '<': 3
        }
    }
];

describe('models/result-parser - parse rulesResultArr', function () {
    let resultParser;
    it('Use mockRuleResults', function () {
        resultParser = require('../models/result-parser');
        assert.equal(
            [
                'There are 1 <img> tag.',
                'There are 0 <a> tag.',
                'This HTML doesn\'t have <title> tag in head tag.',
                'This HTML have more than 3 <strong> tag.',
                'This HTML have less than 3 <p> tag.'
            ].join('\n'), resultParser.parseResult({ rules: mockResults }));
    });
});
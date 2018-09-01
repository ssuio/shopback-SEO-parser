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
            include: 'strong',
        },
        count: 1,
        condition: {
            '<': 3
        }
    }, {
        tag: {
            exclude: 'title',
        },
        count: 3,
        condition: {
            '=': 3
        }
    }
];

describe('models/result-parser - parse rulesResultArr', function () {
    let resultParser;
    it('Use mockRuleResults', function () {
        resultParser = require('../models/result-parser');
        assert.equal(
            'There are 1 <img> tag without alt attribute.\n' +
            'There are 0 <a> tag without rel attribute someStr value.\n' +
            'This HTML without <title> tag in head tag.\n' +
            'There is more than 3 <strong> tag in HTML.\n' +
            'There is less than 3 <p> tag in HTML.\n' +
            'There are 3 <strong> tag in HTML.\n',
            resultParser.parseResult(mockResults));
    });
});
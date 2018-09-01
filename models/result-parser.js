/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/**
 * Module dependency.
 */

const ParseResultError = require('../error/parse-result-error');
const _ = require('lodash');

/**
 * Result entry.
 */

function translateResult(resultObj) {
    let resArr = [];
    for (let key in resultObj) {
        let resultArr;
        if (key == 'rules') {
            resultArr = resultObj[key];
        } else {
            resultArr = resultObj[key].rules;
        }
        resultArr.forEach(rule => {
            let str = '';
            str += translateTag(rule);
            str += translateAttrs(rule);
            str += translateScope(rule);
            resArr.push(str.trim());
        });
    }

    return resArr.join('.\n') + '.';
}

/**
 * Handle tag part.
 */

function translateTag(rule) {
    if (rule.condition) {
        let comparator = _.keys(rule.condition)[0];
        let comparatorTest = translateComparatorText(rule.count, comparator, rule.condition[comparator]);
        let tagStr = `<${rule.tag.include ? rule.tag.include : rule.tag.exclude}> tag `;
        return comparatorTest + tagStr;
    } else if (rule.tag.include) {
        let count = rule.count;
        return `There are ${count} <${rule.tag.include}> tag `;
    } else if (rule.tag.exclude) {
        let count = rule.count;
        if (count > 0) {
            return `This HTML does have ${count} <${rule.tag.exclude}> tag `;
        } else {
            return `This HTML doesn't have <${rule.tag.exclude}> tag `;
        }
    } else {
        throw new ParseResultError('Result has no tag.');
    }
}

/**
 * Handle attrs part.
 */

function translateAttrs(rule) {
    let withAttrsStr = 'with ';
    let withoutAttrsStr = 'without ';
    let retStr = '';

    if (rule.attrs && rule.attrs.with && !_.isEmpty(rule.attrs.with)) {
        retStr += withAttrsStr;
        for (let key in rule.attrs.with) {
            retStr += perAttrStr(key, rule.attrs.with[key]);
        }
    }
    if (rule.attrs && rule.attrs.without && !_.isEmpty(rule.attrs.without)) {
        retStr += withoutAttrsStr;
        for (let key in rule.attrs.without) {
            retStr += perAttrStr(key, rule.attrs.without[key]);
        }
    }
    return retStr;
    function perAttrStr(key, value) {
        return `${key} attribute ` + (value ? `${value} value ` : '');
    }
}

/**
 * Handle outter tag translation.
 */

function translateScope(rule) {
    if (rule.scope) {
        return `in ${rule.scope} tag`;
    }
    return '';
}

/**
 * Handle comparator translation.
 */

function translateComparatorText(count, comparators, specNum) {
    var arr = comparators.split('');
    var ret = false;
    for (var idx in arr) {
        switch (arr[idx]) {
            case '>':
                ret = (ret || (count > specNum));
                if (ret) {
                    return `This HTML have more than ${specNum} `;
                } else {
                    return `This HTML dosen't have more than ${specNum} `;
                }
            case '<':
                ret = (ret || (count < specNum));
                if (ret) {
                    return `This HTML have less than ${specNum} `;
                } else {
                    return `This HTML dosen't have less than ${specNum} `;
                }
            default:
                throw new ParseResultError('Invalid comparator.');
        }
    }
    return ret;
}

module.exports = {
    parseResult: translateResult
};
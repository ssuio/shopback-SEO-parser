const ParseResultError = require('../error/parse-result-error');
const _ = require('lodash');

function translateResult(resultArr) {
    let resArr = [];
    resultArr.forEach(rule => {
        let str = '';
        str += translateTag(rule);
        str += translateAttrs(rule);
        str += translateScope(rule);
        resArr.push(str.trim());
    });
    return resArr.join('.\n') + '.';
}

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
        let count = rule.tag.count;
        if (count > 0) {
            return `There are ${count} <${rule.tag.exclude}> tag `;
        } else {
            return `This HTML without <${rule.tag.exclude}> tag `;
        }
    } else {
        throw new ParseResultError('Result has no tag.');
    }
}

function translateAttrs(rule) {
    let includeAttrsStr = 'with ';
    let excludeAttrsStr = 'without ';
    let retStr = '';

    if (rule.attrs && rule.attrs.include && !_.isEmpty(rule.attrs.include)) {
        retStr += includeAttrsStr;
        for (let key in rule.attrs.include) {
            retStr += perAttrStr(key, rule.attrs.include[key]);
        }
    }
    if (rule.attrs && rule.attrs.exclude && !_.isEmpty(rule.attrs.exclude)) {
        retStr += excludeAttrsStr;
        for (let key in rule.attrs.exclude) {
            retStr += perAttrStr(key, rule.attrs.exclude[key]);
        }
    }
    return retStr;
    function perAttrStr(key, value) {
        return `${key} attribute ` + (value ? `${value} value ` : '');
    }
}

function translateScope(rule) {
    if (rule.scope) {
        return `in ${rule.scope} tag`;
    }
    return '';
}

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
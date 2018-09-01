const _ = require('lodash');

function RulesHandler(rules) {
    this.rules = refine(rules);
}

function refine(rules) {
    const refinedRules = { rules: [] };

    /**
     * Search scope.
    */

    rules.forEach(rule => {
        let scope = rule.scope;
        if (scope) {
            refinedRules[scope] = refinedRules[scope] || { rules: [] };
            refinedRules[scope].rules.push(Object.assign({ count: 0 }, rule));
        } else {
            refinedRules.rules.push(Object.assign({ count: 0 }, rule));
        }
    });

    return refinedRules;
}

RulesHandler.prototype.verify = function (scope, tag, attrs) {
    const self = this;
    const refinedRules = self.rules;
    for (let key in refinedRules) {
        if (key == 'rules') {
            verifyRules(refinedRules[key], tag, attrs);
        } else if (scope.includes(key)) {
            verifyRules(refinedRules[key].rules, tag, attrs);
        }
    }
};

function verifyRules(rules, tag, attrs) {
    rules.forEach(rule => {
        let verifyResult = verifyTag(rule, tag, attrs);
        verifyResult ? rule.count++ : '';
    });
}

function verifyTag(rule, tag, attrs) {
    let ruleTag = rule.tag.include || rule.tag.exclude;
    if (ruleTag.toLowerCase() == tag.toLowerCase()) {
        return verifyAttr(rule.attrs, attrs);
    } else {
        return false;
    }
}

function verifyAttr(ruleAttrs, attrs) {

    if (!ruleAttrs) {
        return true;
    }

    let includeAttrs = _.isEmpty(ruleAttrs.include) ? ruleAttrs.include : undefined;
    let matchInclude = !includeAttrs; //Because undefined means no rules
    let excludeAttrs = _.isEmpty(ruleAttrs.exclude) ? ruleAttrs.exclude : undefined;
    let matchExclude = true;

    let keys = _.keys(attrs);
    keys.forEach(key => {
        if (includeAttrs) {
            //Check attr without value.
            if (includeAttrs.hasOwnProperty(key) && (includeAttrs[key] === undefined) || (includeAttrs[key] === 'undefined')) {
                matchInclude = true;
            }
            //Check attr without value.
            else if (includeAttrs.hasOwnProperty(key) && includeAttrs[key] === attrs[key]) {
                matchInclude = true;
            }
        }
        if (excludeAttrs) {
            //Check attr without value.
            if (excludeAttrs.hasOwnProperty(key) && (excludeAttrs[key] === undefined) || (excludeAttrs[key] === 'undefined')) {
                matchExclude = true;
            }
            //Check attr without value.
            else if (excludeAttrs.hasOwnProperty(key) && excludeAttrs[key] === attrs[key]) {
                matchExclude = true;
            }
        }
    });

    return matchInclude && matchExclude;
}

module.exports = RulesHandler;

if (module.id === '.') {
    let rules = require('../rules/pre-defined-rules');
    let refinedRules = refine(rules);
    verifyRules(refinedRules['rules'], 'meta', { name: 'description' });
}
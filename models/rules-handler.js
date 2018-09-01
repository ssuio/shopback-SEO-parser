/**
 * @author Noah Chou <xssuio@gmail.com>
 */

/**
 * Module dependency.
 */

const _ = require('lodash');

/**
 * Constructor.
 */

function RulesHandler(rules) {
    this.rules = refine(rules);
}

/**
 * Unify rules in it's scope.
 */

function refine(rules) {
    const refinedRules = { rules: [] };

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

/**
 * Verify by per rule in it's scope.
 */

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

/**
 * Verify by per rule with tag/attrs.
 */

function verifyRules(rules, tag, attrs) {
    rules.forEach(rule => {
        let verifyResult = verifyTag(rule, tag, attrs);
        verifyResult ? rule.count++ : '';
    });
}

/**
 * Verify by per rule with tag.
 */

function verifyTag(rule, tag, attrs) {
    let ruleTag = rule.tag.include || rule.tag.exclude;
    if (ruleTag.toLowerCase() == tag.toLowerCase()) {
        return verifyAttr(rule.attrs, attrs);
    } else {
        return false;
    }
}

/**
 * Verify by per rule with attrs.
 */

function verifyAttr(ruleAttrs, attrs) {

    if (!ruleAttrs) {
        return true;
    }

    let withAttrs = !_.isEmpty(ruleAttrs.with) ? ruleAttrs.with : undefined;
    let matchWith = withAttrs === '' ? true : !withAttrs; //Because undefined means no rules
    let withoutAttrs = !_.isEmpty(ruleAttrs.without) ? ruleAttrs.without : undefined;
    let matchWithout = true;

    let keys = _.keys(attrs);
    keys.forEach(key => {
        if (withAttrs) {
            //Check attr without value.
            if (withAttrs.hasOwnProperty(key) && withAttrs[key] === '') {
                matchWith = true;
            }
            //Check attr without value.
            else if (withAttrs.hasOwnProperty(key) && withAttrs[key] === attrs[key]) {
                matchWith = true;
            }
        }
        if (withoutAttrs) {
            //Check attr without value.
            if (withoutAttrs.hasOwnProperty(key) && withoutAttrs[key] === '') {
                matchWithout = false;
            }
            //Check attr without value.
            else if (withoutAttrs.hasOwnProperty(key) && withoutAttrs[key] === attrs[key]) {
                matchWithout = false;
            }
        }
    });

    return matchWith && matchWithout;
}

module.exports = RulesHandler;
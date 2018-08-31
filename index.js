const RuleError = require('./error/rule-error');

function ShopbackSEOParser(rules, source){
    this.rules = rules;
    this.source = source;
}

ShopbackSEOParser.prototype.setRules = function(rules){
    this.rules = rules;
};

ShopbackSEOParser.prototype.parse = function(){
    if(!this.rules){
        throw new RuleError();
    }

    return new Promise((resolve, reject)=>{
        reject();
    });
};

module.exports = ShopbackSEOParser;
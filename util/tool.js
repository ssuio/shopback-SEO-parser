const fs = require('fs');
const stream = require('stream');

function getStreamFromSource(source) {
    if (typeof source === 'string') {
        return fs.createReadStream(source);
    } else if (source instanceof stream.Readable) {
        return source;
    }
}

function compare(count, comparators, specNum) {
    var arr = comparators.split('');
    var ret = false;
    for (var idx in arr) {
        switch (arr[idx]) {
            case '>':
                ret = (ret || (count > specNum));
                break;
            case '=':
                ret = (ret || (count == specNum));
                break;
            case '<':
                ret = (ret || (count < specNum));
        }
    }
    return ret;
}

module.exports = {
    getStreamFromSource
};
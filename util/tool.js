
function compareInText(count, comparators, specNum) {
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
    compareInText
};
'use strict';

module.exports.format = function format(tokens){
    if (Array.isArray(tokens)) {
        var pruned = [];
        for(var i=0;i<tokens.length;i++) {
            pruned.push(prune(tokens[i]))
        }
        return pruned;
    } else {
        return prune(tokens)
    }
};

function prune(token) {
    return {
        'apiId' : token.apiId,
        'apiSecret' : token.apiSecret,
        'study': token.study,
        'resource': token.resource
    };
}
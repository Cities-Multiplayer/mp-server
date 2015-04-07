function MPHelpers() {
    this.keys = {
        t: "type",
        d: "data",
        o: "object",
        ps: "publicSession",
        g: "guid",
        ji: "joinId"
    };
    this.types = {
        c: "clientConnection",
        op: "objectPlacement",
        si: "serverInfo",
        ns: "newSession",
        sd: "sessionData",
        nsm: "newSegment",
        nn: "newNode"
    };
    this.typesReversed = {};
    for (var i in this.types) {
        this.typesReversed[this.types[i]] = i;
    }
}

MPHelpers.prototype.typeReplace = function (type) {
    return this.typesReversed[type] || type;
}

MPHelpers.prototype.typeCodeReplace = function (typeCode) {
    return this.types[typeCode] || typeCode;
}

MPHelpers.prototype.compressedKey = function(key) {
    key = key.split(/(?=[A-Z])/);
    var retKey = '';
    key.forEach(function (value) {
        retKey += value[0];
    });
    return retKey.toLowerCase();
}

MPHelpers.prototype.decompressedKey = function (key) {
    return this.keys[key] || key;
}

module.exports = MPHelpers;
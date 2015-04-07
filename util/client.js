var Promise = require('bluebird'),
    MPHelpers = require('./helpers'),
    MPHandlers = require('./handlers'),
    Chance = require('chance');

function MPClient(connection, server) {
    var that = this;

    this._chance = new Chance();
    this._connection = connection;
    this._id = this._chance.guid();
    this._session = null;
    this._server = server;
    this._helpers = new MPHelpers();
    this._handlers = new MPHandlers(this);

    this._connection.on('data', function(data){
        var message = data.toString();
        that.on.data.call(that, message);
    });
    this._connection.on("error", function(err){
        // An error on the client side occurred
        console.log(err);
    });
    this.send({
        type: 'serverInfo',
        data: {
            server: this._server.name
        }
    });
}

MPClient.prototype.send = function(message, preformatted) {
    var that = this;

    return new Promise(function (resolve, reject) {
        if (!preformatted) {
            message = that.formatMessage(message);
        } else if(typeof message !== "string") {
            message.t = that._helpers.typeReplace(message.type);
            delete message.type;
            message = JSON.stringify(message);
        }
        console.log("Sending: " + message);
        that._connection.write(message, 'UTF8', function(){
            resolve(arguments);
        });
    });
};

MPClient.prototype.formatMessage = function (message) {
    var that = this;

    function iterate(obj, stack) {
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                var prop = that._helpers.compressedKey(property);
                if (typeof obj[property] == "object") {
                    obj[prop] = obj[property];
                    delete obj[property];
                    iterate(obj[prop], stack + '.' + prop);
                } else {
                    if (property === "type") {
                        obj[property] = that._helpers.typeReplace(obj[property]);
                    }
                    if (obj[property] === true) {
                        obj[property] = "True";
                    } else if (obj[property] === false) {
                        obj[property] = "False";
                    }
                    obj[prop] = obj[property];
                    delete obj[property];
                }
            }
        }
    }

    iterate(message, '');
    return JSON.stringify(message);
};

MPClient.prototype.bindEvents = function() {
    this._connection.on('message', this.on.message.bind(this))
};

MPClient.prototype.close = function(errorCode) {
    var errorCodes = {
        4000: 'Server Full',
        4001: 'Unknown Message'
    };
    this._connection.close(errorCode, errorCodes[errorCode] || 'Unknown Error');
};

MPClient.prototype.on = {};
MPClient.prototype.on.data = function (message) {
    var that = this;
    var isJSON = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(message.replace(/"(\\.|[^"\\])*"/g, '')));
    
    if (isJSON) {
        function iterate(obj, stack) {
            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    var prop = that._helpers.decompressedKey(property);
                    if (typeof obj[property] == "object") {
                        if (prop !== property) {
                            obj[prop] = obj[property];
                            delete obj[property];
                        }
                        iterate(obj[prop], stack + '.' + prop);
                    } else {
                        if (property === "t") {
                            obj[property] = that._helpers.typeCodeReplace(obj[property]);
                        }
                        if (obj[property] === "True") {
                            obj[property] = true;
                        } else if (obj[property] === "False") {
                            obj[property] = false;
                        }
                        if (prop !== property) {
                            obj[prop] = obj[property];
                            delete obj[property];
                        }
                    }
                }
            }
        }
        
        try{
            message = JSON.parse(message);
            iterate(message, '');
            if (that._handlers[message.type] !== undefined) {
                that._handlers[message.type](message.data, message);
            } else {
                console.log("No Handler For '" + message.type + "'");
            }
            console.log(message);
        } catch(e) {
            console.log(e);
            console.log(e.stack);
        }
    } else {
        //that.close(4001);
    }
};

module.exports = MPClient;
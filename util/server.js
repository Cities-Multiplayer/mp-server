var net = require('net'),
    MPDebug = require('./debug'),
    MPConfig = require('./config'),
    MPClient = require('./client'),
    MPSession = require('./session');

function MPServer(name, port) {
    var that = this;

    this.name = name;
    this._debug = new MPDebug('MPServer');
    this._config = new MPConfig();
    this._sessions = new MPSession();
    this._debug.log('Starting MPServer...');
    this._connectionCount = 0;
    this._server = net.createServer(function(sock) {
        // client connected
        var client = new MPClient(sock, that);
    }).listen({
        port: port || 12345
    }, function(){
        that._debug.log('Started MPServer!');
    });
    this._server.maxConnections = this._config.maxConnections;
}

module.exports = MPServer;

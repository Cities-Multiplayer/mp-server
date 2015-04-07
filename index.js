var MPServer = require('./util/server'),
    os = require("os"),
    serverName = os.hostname().split('mpServer-')[1].replace(/\-/g, ' ');

new MPServer(serverName);

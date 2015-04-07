var Chance = require('chance');

function MPSession() {
	this._chance = new Chance();
	this._session = {};
	this._joinIds = {};
}

MPSession.prototype.newSession = function(client) {
	var that = this;
	
	var guid = that._chance.guid();
	var joinId = that._chance.hash({casing: 'upper', length: 5});
	while (this._joinIds[joinId] !== undefined) {
		joinId = that._chance.hash({casing: 'upper', length: 5});
	}
	this._session[guid] = {
		joinId: joinId,
		clientIds: [client._id],
		clients: {}
	};
	this._session[guid].clients[client._id] = client;
	this._joinIds[joinId] = guid;
	return guid;
}

MPSession.prototype.sendMessage = function(sessionId, data, excludeIds, preFormatted) {
	for(var i in this._session[sessionId].clients) {
		var client = this._session[sessionId].clients[i];
		if (excludeIds == undefined || excludeIds.indexOf(client._id) == -1) {
			client.send(data, preFormatted);
		}
	};
}

MPSession.prototype.getSession = function(guid) {
	return this._session[guid];
}

module.exports = MPSession;
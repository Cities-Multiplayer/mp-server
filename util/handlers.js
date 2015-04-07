function MPHandlers(client) {
	this._client = client;
	this._sessions = client._server._sessions;
}

MPHandlers.prototype.newSession = function(data){
	var sessionID = this._sessions.newSession(this._client);
	this._client._session = sessionID;
	this._client.send({
		type: 'sessionData',
		data: {
			guid: sessionID,
			joinId: this._sessions.getSession(sessionID).joinId
		}
	});
}

MPHandlers.prototype.newSegment = function(data, fullData){
	//this._sessions.sendMessage(this._client._session, fullData, [this._client._id]);
	fullData = { nssi: '2147483648',
  nsbc: '(574.7,105.5,-469.1)',
  nsbs: '(44.4,2.2,76.1)',
  nssd: '(0.4,0.0,0.9)',
  nsed: '(-0.4,0.0,-0.9)',
  nsf: 'Created',
  nsal: '0',
  nsbi: '7645',
  nsmi: '7647',
  nsl: '204827',
  nsp: '0',
  nssn: '24391',
  nsen: '7069',
  nsbsl: '17496',
  nsbsr: '26033',
  nsbel: '17505',
  nsber: '32487',
  nstb: '0',
  nssls: '0',
  nssrs: '0',
  nsels: '0',
  nsers: '0',
  nsii: '67',
  nsngs: '0',
  nstd: '0',
  nstls0: '0',
  nstls1: '0',
  nscas: '0',
  nscae: '0',
  nsfc: '0',
  type: 'newSegment' };

	this._sessions.sendMessage(this._client._session, fullData, [], true);
}

MPHandlers.prototype.newNode = function(data, fullData){
	var node = { nnsi: '1099511627776',
  nnbc: '(245.2, 121.1, -460.0)',
  nnbs: '(10.0, 2.0, 10.0)',
  nnf: 'Created, OnGround',
  nnbi: '7646',
  nnii: '67',
  nnb: '0',
  nncc: '0',
  nnc: '0',
  nne: '0',
  nnfc: '0',
  nnho: '0',
  nnl: '0',
  nnlo: '0',
  nnmwt: '0',
  nnnbn: '0',
  nnngn: '31334',
  nnnln: '0',
  nnpo: '(245.2, 120.1, -460.0)',
  nnp: 'None',
  nns0: '29772',
  nns1: '0',
  nns2: '0',
  nns3: '0',
  nns4: '0',
  nns5: '0',
  nns6: '0',
  nns7: '0',
  nntc: '0',
  nntl: '0',
  type: 'newNode' }
	this._sessions.sendMessage(this._client._session, node, [], true);
node = { nnsi: '274877906944',
  nnbc: '(231.7, 118.7, -506.0)',
  nnbs: '(10.0, 2.0, 10.0)',
  nnf: 'Created, OnGround',
  nnbi: '7645',
  nnii: '67',
  nnb: '0',
  nncc: '0',
  nnc: '0',
  nne: '0',
  nnfc: '0',
  nnho: '0',
  nnl: '0',
  nnlo: '0',
  nnmwt: '0',
  nnnbn: '0',
  nnngn: '0',
  nnnln: '0',
  nnpo: '(231.7, 117.7, -506.0)',
  nnp: 'None',
  nns0: '29772',
  nns1: '0',
  nns2: '0',
  nns3: '0',
  nns4: '0',
  nns5: '0',
  nns6: '0',
  nns7: '0',
  nntc: '0',
  nntl: '0',
  type: 'newNode' }
	this._sessions.sendMessage(this._client._session, node, [], true);
	//this._sessions.sendMessage(this._client._session, fullData, [this._client._id]);
	//this._sessions.sendMessage(this._client._session, fullData, [], true);
}

module.exports = MPHandlers;
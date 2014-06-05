var DataProcessError = require('../error').DataProcessError,
	sendError = require('../error').sendError
	api = require('./api');

var stream = {
	middleware: function(req, res, next) {	
		var userIn = '';
		stream.res = res;

		req.on('readable', function() {
			if(!stream.connected) {
				stream.connected = true;	
				stream.connectionCallback();				
			} 					

			userIn = req.read();
			try {
				var message = JSON.parse(userIn);
				if(message.data) {
					readCallback(message.data, res);
				}
			} catch(err) {
				sendError('error', res);
			}
			

		})
		.on('end', function() {			
			stream.connected = false;
			stream.disconnectionCallback();
			stream.res = null;
			res.end();
		});	
	},
	put: function(data) {
		if(stream.connected) {
			send(data, stream.res);
		}
	},
	connectionCallback: function(){},
	disconnectionCallback: function(){},
	res: null,
	connected: false
}

function send(data, res) {
	res.write(JSON.stringify({"response": data}));
}

function readCallback(data, res){
	send(api.getAns(data),res);
}

exports.stream = stream;
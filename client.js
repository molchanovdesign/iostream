function openStream(connectionOptions, readCallback){
	var stream = {};

	stream.req = http.request(connectionOptions, function(res) {
		res.setEncoding('utf8');
		res.on('data', function(data){
			try{
				var serRes = JSON.parse(data);
				if (!serRes.error && serRes.response) {
					readCallback(serRes.response);				
				} else {
					showError(serRes.errorMessage, 'stream');
					stream.close();
				}
			}catch(e){
				showError("Bad response "+ data, 'stream');
				stream.close();
			}
		});
	}).on('error', function(e) {
		showError('Problem with request','');
		stream.close();
	});	

	stream.close = function(){
		this.req.end();
	}

	stream.put = function(data){
		stream.req.write(JSON.stringify({data: data}));
	}
	
	return stream;
}
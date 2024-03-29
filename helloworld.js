var http = require('http');
	fs = require('fs');

function serverStaticFile(res,path,contentType,responseCode){
	if (!responseCode) responseCode = 200;
	fs.readFile(__dirname + path, function(err,data){
		if(err){
			res.writeHead(500, {'Content-Type':'text/plain'});
			res.end('500 - Internal Error');
		} else {
			res.writeHead(responseCode,
				{'Content-Type':contentType});
			res.end(data);
		}	
	});
}

http.createServer(function(req,res){
	// normalize url by remving querystring, optional
	// trailing slash, and making lowercase
	var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
	switch(path){
		case '':
			serverStaticFile(res, '/public/home.html','text/html');
			break;
		case '/about':
			serverStaticFile(res,'/public/about.html','text/html');
			break;
		case '/img/logo.jpg':
			serverStaticFile(res,'/public/img/logo.jpg','image/jpeg');
			break;
		default:
			serverStaticFile(res,'/public/404.html','text/html',404);
			break;
	}
}).listen(3000);

console.log('Server started on localhost: 3000; press Ctrl-C to terminate...');
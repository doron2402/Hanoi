// Load the http module to create an http server.
var http = require('http'),
 	url = require('url'),
	path = require('path'),
    fs = require('fs'),
    port = process.env.PORT || 8000,
    mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};


setInterval(function(){
  console.log('memory', process.memoryUsage())
}, 1000 * 300);

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
	var uri = url.parse(request.url).pathname,
    	filename = path.join(process.cwd(), uri);

    var req_file = filename.split('/'),
    file_to_use = null,
    header_to_use = null;
    

    switch(path.extname(filename).split(".")[1]){
    	case 'html':
    		//Use public/view 
    		header_to_use = mimeTypes["html"];
    		file_to_use = './public/view/' + req_file[req_file.length-1];
       		break;
    	case 'js':
    		//Use public/js 
    		header_to_use = mimeTypes["js"]
        	file_to_use = './public/js/' + req_file[req_file.length-1];
    		break;
    	case 'css':
    		//Use public/css
    		header_to_use = mimeTypes["css"]
    		file_to_use = './public/css/' + req_file[req_file.length-1];
    		break;
    	default:
    		header_to_use = mimeTypes["html"]
    		file_to_use = './public/view/index.html';
    		break;
    }

    
    
    
    path.exists(file_to_use, function(exists){
    	if(!exists) {
            console.log("not exists: " + file_to_use);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('404 Not Found\n');
            response.end();
            return;
        }

        var fileStream = fs.createReadStream(file_to_use);
       	response.writeHead(200,header_to_use); 
        fileStream.pipe(response);
    });

    /*
    path.exists(filename, function(exists) {
        
        if(!exists) {
            console.log("not exists: " + filename);
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write('404 Not Found\n');
            response.end();
            return;
        }
        /*
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        response.writeHead(200, mimeType);

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(response);
		*/
    /*});*/ //end path.exists
	

  //response.writeHead(200, {"Content-Type": "text/html"});
  //response.end("Hello World\n" + uri + "\n" + filename);
});

server.listen(port);

console.log("Server running at http://127.0.0.1:" + port + "/");
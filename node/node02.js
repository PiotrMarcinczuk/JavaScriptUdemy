var http = require('http');
var url = require('url');

http.createServer(
    function(req, res){
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write('req.url: ' + req.url + '<br>');

        let parsedUrl = url.parse(req.url, true); // true zwraca obiekt
        res.write('parsedUrl.pathname: ' + parsedUrl.pathname + '<br>');

        res.write('parsedUrl.query: <br>'
            + JSON.stringify(parsedUrl.query).replace(/,/g, ',<br>')
        );

        if(parsedUrl.query.arg2) res.write('arg2: <br>' + parsedUrl.query.arg2);

        res.end();
    }
).listen(8080);
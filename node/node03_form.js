var http = require('http');
const { parse } = require('querystring');

let htmlForm = 
`
    <html>
    <head><title>formularz</title></head>
    <body>
        <form method='POST'>
            Name: <input name='name'> <br>
            Emial: <input name='email'> <br>
            <input type='submit' value='Send'>
        </form>
    </body>
    </html>
`

http.createServer(
    function(req, res){
        let temp = '';
        req.on('data', function(chunk){
            temp += chunk;
        });

        req.on('end', function(){
            let parsed = parse(temp);
            console.log('data: ' + temp);
            console.log('parsed: ' + JSON.stringify(parsed));

            res.writeHead(200, {'Content-type':'text/html'});
            res.end(htmlForm);
        })
    }
).listen(8080);
# deps
fs = require 'fs'
connect = require 'connect'
proxy = require './lib/tinyproxy'

# stuff
connect_server = connect.createServer()
connect_server.use connect.bodyParser()
connect_server.use connect.static __dirname + '/public'

# ajax proxy
connect_server.use proxy '^/v3(/.+)', 'api.github.com'

# serve page
connect_server.use connect.router (app) ->
	app.get '/', (req, res, next) ->
		res.writeHead 200,
			'Content-Type': 'text/html'
		res.end fs.readFileSync __dirname + '/public/index.html'
	
# start server
connect_server.listen 8080
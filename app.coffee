fs = require 'fs'
connect = require 'connect'
https = require 'https'

proxy = (req, res, next) ->
	opts =
		host: 'api.github.com'
		path: req.originalUrl
		method: req.method
	api_req = https.request opts, (response) ->
		body = ''
		res.writeHead response.statusCode,
			response.headers
		response.on 'data', (chunk) ->
			body += chunk
		response.on 'end', ->
			res.end body
	if req.body
		api_req.write JSON.stringify req.body
	api_req.end()
	
connect_server = connect.createServer()
connect_server.use connect.bodyParser()
connect_server.use connect.static __dirname + '/public'
connect_server.use connect.router (app) ->

	app.get '/', (req, res, next) ->
		res.writeHead 200,
			'Content-Type': 'text/html'
		res.end fs.readFileSync __dirname + '/public/index.html'
		
	app.get '/**', proxy
	app.post '/**', proxy
		
connect_server.listen 8080
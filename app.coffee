# deps
fs = require 'fs'
connect = require 'connect'
auth = require 'connect-auth'
_ = require 'underscore'
https = require 'https'
$ = require 'jquery'

# stuff
view = _.template fs.readFileSync __dirname + '/public/app.html', 'utf8'
connect_server = connect.createServer()
connect_server.use connect.cookieParser()
connect_server.use connect.bodyParser()
connect_server.use connect.session secret: 'lol'

# asset compilation
compile_opts = enable: ['coffeescript', 'less'], src: './src', dest: './public'
connect_server.use connect.compiler compile_opts
connect_server.use connect.static __dirname + '/public'
connect_server.use connect.query()

# simple readme cache
readmes = {}

# github auth
connect_server.use auth strategies: [auth.Github require './keys']

# serve app
connect_server.use connect.router (app) ->

	# login
	app.get '/login', (req, res, next) ->
		req.authenticate ['github'], (err, auth) ->
			# is redirecting
			if auth == undefined
			    return false
			# error connecting
			else if err
			    res.end 'err: ' + err
			# dunno
			else if !auth
			    res.end 'what happened here'
			# successful
			else
			    res.writeHead 303, Location: '/'
			    res.end()

	# logout
	app.get '/logout', (req, res, next) ->
		req.logout()

	# hacky api to get readme html
	app.get '/api/repos/:username/:repo/readme', (req, res, next) ->
		cb = req.query.callback
		username = req.params.username
		repo = req.params.repo
		name = "/#{username}/#{repo}"
		fin = (html) ->
			js = JSON.stringify
				html: html
			res.end "#{cb}(#{js});"
		res.writeHead 200, 'Content-Type': 'application/json'
		if readmes[name]
			fin readmes[name]
		else
			opts =
				host: 'github.com'
				path:name
			api_req = https.request opts, (resp) ->
				body = ''
				resp.on 'data', (chunk) ->
					body += chunk
				resp.on 'end', ->
					readmes[name] = $('#readme', body).html()
					fin readmes[name]
			api_req.end()

	# main page
	app.get '/', (req, res, next) ->
		if req.isAuthenticated()
			res.writeHead 200, 'Content-Type': 'text/html'
			res.end view req.getAuthDetails()
		else
			res.writeHead 303, Location: '/login'
			res.end()
	
# start server
connect_server.listen 8000
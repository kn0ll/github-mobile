# deps
fs = require 'fs'
connect = require 'connect'
auth = require 'connect-auth'
login = require './lib/login'
proxy = require './lib/tinyproxy'

# stuff
connect_server = connect.createServer()
connect_server.use connect.cookieParser()
connect_server.use connect.bodyParser()
connect_server.use connect.session secret: 'lol'
connect_server.use connect.static __dirname + '/public'

# ajax proxy
connect_server.use proxy '^/v3(/.+)', 'api.github.com'

# github auth
connect_server.use auth strategies: [auth.Github require './keys']
connect_server.use login()

# serve app
connect_server.use connect.router (app) ->

	# logout
	app.get '/logout', (req, res, next) ->
		req.logout()

	# main page
	app.get '/', (req, res, next) ->

		res.writeHead 200, 'Content-Type': 'text/html'

		if req.isAuthenticated()
			res.end fs.readFileSync __dirname + '/public/app.html'

		else
			res.end '<a href="/login">login</a>'
	
# start server
connect_server.listen 8000
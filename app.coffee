# deps
fs = require 'fs'
connect = require 'connect'
auth = require 'connect-auth'
_ = require 'underscore'
proxy = require './lib/tinyproxy'

# stuff
view = _.template(fs.readFileSync(__dirname + '/public/app.html', 'utf8'))
connect_server = connect.createServer()
connect_server.use connect.cookieParser()
connect_server.use connect.bodyParser()
connect_server.use connect.session secret: 'lol'
connect_server.use connect.static __dirname + '/public'

# github auth
connect_server.use auth strategies: [auth.Github require './keys']

# ajax proxy
connect_server.use proxy '^/v3(/.+)', 'api.github.com'

# serve app
connect_server.use connect.router (app) ->

	# login
	app.get '/login', (req, res, next) ->

		req.authenticate ['github'], (err, auth) ->

                # is redirecting
                if auth == undefined
                    return false

                else if err
                    res.end 'err: ' + err

                else if !auth
                    res.end 'what happened here'

                # successful
                else
                    res.writeHead 303, Location: '/'
                    res.end()

	# logout
	app.get '/logout', (req, res, next) ->

		req.logout()

	# main page
	app.get '/', (req, res, next) ->

		if req.isAuthenticated()
			res.writeHead 200, 'Content-Type': 'text/html'
			res.end _.template(fs.readFileSync(__dirname + '/public/app.html', 'utf8'), req.getAuthDetails())
			# dont cache view for now
			# res.end view req.getAuthDetails()

		else
			res.writeHead 303, Location: '/login'
			res.end()
	
# start server
connect_server.listen 8000
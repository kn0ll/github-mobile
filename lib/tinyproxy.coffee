###

a small proxy intended for cross domain ajax

examples:
	connect_server.use proxy '^(/.+)', 'api.twitter.com'
	connect_server.use proxy '^/gh(/.+)', 'api.github.com'

@path regex of the path your proxy should address
	  the first match group will be the forwarded url

@host the host you want to proxy

###

https = require 'https'

module.exports = (path, host) ->

	(req, res, next) ->

		if match = req.originalUrl.match path
			opts =
				host: host
				path: match[1]
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

		else
			next()

GH = ((gh) ->

	username = gh.User.get 'login'

	Base = class extends Backbone.Collection

		sync: (method, model, options) ->
			options.dataType = 'jsonp'
			options.url = "https://api.github.com#{this.url}"
			Backbone.sync method, model, options

		parse: (res) -> res.data

	Collections = class

		News: class extends Base
			url: "/users/#{username}/received_events/public"
			
		Events: class extends Base
			url: "/users/#{username}/events"

		Repos: class extends Base
			url: "/users/#{username}/repos"

		Watched: class extends Base
			url: "/users/#{username}/watched"

	gh.Collections = new Collections
	gh

)(window['GH'] || {})
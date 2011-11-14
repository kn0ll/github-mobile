GH = ((gh) ->

	Base = class extends Backbone.Collection

		initialize: (models, options) ->
			this.url = this.url options.user.get 'login'

		sync: (method, model, options) ->
			options.dataType = 'jsonp'
			options.url = "https://api.github.com#{this.url}"
			Backbone.sync method, model, options

		parse: (res) -> res.data

	Collections = class

		News: class extends Base
			url: (login) -> "/users/#{login}/received_events/public"
			
		Events: class extends Base
			url: (login) -> "/users/#{login}/events"

		Repos: class extends Base
			url: (login) -> "/users/#{login}/repos"

		Watched: class extends Base
			url: (login) -> "/users/#{login}/watched"

	gh.Collections = new Collections
	gh

)(window['GH'] || {})
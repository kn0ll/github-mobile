GH = ((gh, username) ->

	username = gh.User.get 'login'

	Base = class extends Backbone.Collection

		sync: (method, model, options) ->
			options.dataType = 'jsonp'
			options.url = _.sprintf 'https://api.github.com%s', this.url
			Backbone.sync method, model, options

		parse: (res) -> res.data

	Collections = class

		News: class extends Base
			url: _.sprintf('/users/%s/received_events/public', username)
			
		Events: class extends Base
			url: _.sprintf('/users/%s/events', username)

		Repos: class extends Base
			url: _.sprintf('/users/%s/repos', username)

		Watched: class extends Base
			url: _.sprintf('/users/%s/watched', username)

	gh.Collections = new Collections
	gh

)(window['GH'] || {})
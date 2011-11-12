GH = ((gh) ->

	Base = class extends Backbone.Model

		fetch: (options = {}) ->
			options.dataType = 'jsonp'
			options.url = "https://api.github.com#{this.url()}"
			Backbone.Model.prototype.fetch.call this, options

		parse: (res) -> res.data

	Models = class

		User: class extends Base
			
			defaults:
				login: false

			url: ->
				username = this.get 'login'
				"/users/#{username}"

	gh.Models = new Models
	gh

)(window['GH'] || {})
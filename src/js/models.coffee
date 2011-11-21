GH = ((gh) ->

	Base = class extends Backbone.Model

		fetch: (options = {}) ->
			options.dataType ?= 'jsonp'
			Backbone.Model.prototype.fetch.call this, options

		parse: (res) -> res.data

	Models = class

		User: class extends Base
			
			defaults:
				login: false

			url: ->
				username = this.get 'login'
				"https://api.github.com/users/#{username}"

		Repo: class extends Base
			
			defaults:
				name: false

			url: ->
				name = this.get 'name'
				"https://api.github.com/repos/#{name}"

		Readme: class extends Base

			defaults:
				repo: false

			url: =>
				name = @get('repo').get 'name'
				"/api/repos/#{name}/readme"

			parse: (res) -> res



	gh.Models = new Models
	gh

)(window['GH'] || {})
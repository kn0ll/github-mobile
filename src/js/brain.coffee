$ ->

	# pages thing
	pages = $('#content').pages()

	Nav = new GH.Views.Nav
		el: $ '#nav'
	
	Router = class extends Backbone.Router

		routes:
			'': 'index'
			'/': 'index'
			'/news': 'news'
			'/:username': 'profile'
			'/:username/:repository': 'repository'

		index: ->
			console.log 'routed: index'
		
		news: ->
			Nav.selectByHref '/news'
			el = (new GH.Views.News
				offset:  Nav.el.height()).el
			pages.create(el) if pages
		
		profile: (username, repository) ->
			user = new GH.Models.User
				login: username
			profile = new GH.Views.Profile
				offset:  Nav.el.height()
				user: user
			if user.login is User.login
				Nav.selectByHref "/#{username}"
			pages.create(profile.el) if pages

		repository: ->
			console.log 'routed: repository'

	router = new Router

	Backbone.history.start()

	$ ->

		# anchors should be routed with backbone
		$('a').live 'click', (e) ->
			router.navigate $(this).attr('href'), true
			e.preventDefault();
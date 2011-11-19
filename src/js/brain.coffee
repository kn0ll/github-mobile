$ ->

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
			news = new GH.Views.News
				offset:  Nav.el.height()
				user: User
			Nav.selectByHref '/news'
			pages.create(news.el) if pages
		
		profile: (username, repository) ->
			profile = new GH.Views.Profile
				offset:  Nav.el.height()
				username: username
			if username is User.get 'login'
				Nav.selectByHref "/#{username}"
			pages.create(profile.el) if pages

		repository: ->
			console.log 'routed: repository'

	router = new Router

	Backbone.history.start()

	$ ->

		$('a').live 'click', (e) ->
			href = $(this).attr('href')
			if href
				router.navigate $(this).attr('href'), true
				e.preventDefault()
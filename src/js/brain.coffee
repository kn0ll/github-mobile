$ ->

	pages = $('#content').pages()

	Nav = new GH.Views.Nav
		el: $ '#nav'
	
	Router = class extends Backbone.Router

		routes:
			'': 'news'
			'/': 'news'
			'/news': 'news'
			'/:username': 'profile'
			'/:username/:repository': 'repo'
		
		news: ->
			news = new GH.Views.News
				user: User
			Nav.selectByHref '/news'
			pages.create(news.el) if pages
		
		profile: (username) ->
			profile = new GH.Views.Profile
				username: username
			if username is User.get 'login'
				Nav.selectByHref "/#{username}"
			pages.create(profile.el) if pages

		repo: (username, repository) ->
			repo = new GH.Views.Repo
				name: "#{username}/#{repository}"
			pages.create(repo.el) if pages

	router = new Router

	Backbone.history.start()

	$ ->

		$('a').live 'click', (e) ->
			href = $(this).attr('href')
			if href
				router.navigate $(this).attr('href'), true
				e.preventDefault()

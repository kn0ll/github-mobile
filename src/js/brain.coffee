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
			'/profile': 'profile'

		index: ->
			console.log 'routed: index'
		
		news: ->
			Nav.selectByHref '/news'
			el = (new GH.Views.News
				offset:  Nav.el.height()).el
			pages.create(el) if pages
		
		profile: ->
			Nav.selectByHref '/profile'
			el = (new GH.Views.Profile
				offset:  Nav.el.height()).el
			pages.create(el) if pages

	router = new Router

	Backbone.history.start()

	$ ->

		# anchors should be routed with backbone
		$('a').live 'click', (e) ->
			router.navigate $(this).attr('href'), true
			e.preventDefault();
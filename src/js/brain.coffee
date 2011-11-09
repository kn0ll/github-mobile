$ ->

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
			new GH.Views.News
				$container: $ '#content'
				offset:  Nav.el.height()
		
		profile: ->
			Nav.selectByHref '/profile'
			new GH.Views.Profile
				$container: $ '#content'
				offset:  Nav.el.height()

	router = new Router

	Backbone.history.start()

	$ ->

		# anchors should be routed with backbone
		$('a').live 'click', (e) ->
			router.navigate $(this).attr('href'), true
			e.preventDefault();
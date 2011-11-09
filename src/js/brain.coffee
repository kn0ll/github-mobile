$ ->

	Nav = new GH.Views.Nav
		el: $ '#nav'
	
	News = new GH.Views.News
		el: $ '#news'

	Profile = new GH.Views.Profile
		el: $ '#profile'
	
	$ ->

		GH.Widgets.Scrollview $('.page'), Nav.el.height()

		News.el.trigger 'pagecreate'
		Profile.el.trigger 'pagecreate'
	
	Router = class extends Backbone.Router

		routes:
			'': 'index'
			'/': 'index'
			'/news': 'news'
			'/profile': 'profile'

		index: ->
			console.log 'wat'
		
		news: ->
			Nav.selectByHref '/news'

		profile: ->
			Nav.selectByHref '/profile'

	router = new Router

	Backbone.history.start()

	$ ->

		route = (href) ->
			router.navigate href, true

		$('a').click (e) ->
			route $(this).attr('href')
			e.preventDefault();
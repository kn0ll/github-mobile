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

	# b2g install
	# crap code to make a confirm message because b2g cannot lolol
	# if confirm 'Wow! You\'re totally on B2G!! Install this one your home screen?'
	# E/GeckoConsole(87): [JavaScript Error: "Couldn't play common dialog event sound:
	# TypeError: Cc['@mozilla.org/sound;1'] is undefined"
	# {file: "resource://gre/modules/CommonDialog.jsm" line: 213}]
	if navigator.mozApps
		# style
		bcss = 
			'padding': '10px 20px'
			'background': '#666'
			'border-radius': '4px'
			'color': '#fff'
			'margin-right': '15px'
		$nob = $('<a class="no" href="#">No</a>').css bcss
		$yesb = $('<a class="yes" href="#">Yes</a>').css bcss
		$confirm = $('<div id="confirm" />').css
			'border-radius': '4px'
			'box-sizing': 'border-box'
			'position': 'absolute'
			'width': '100%'
			'background': '#bbb'
			'padding': '15px 15px 20px'
			'margin': '10px'
		$p = $('<p>Wow! You\'re totally on B2G!! Install this one your home screen?</p>').css
			'margin': '0 0 20px'
		# build
		close = ->
			$confirm.remove()
		install = ->
			navigator.mozApps.install 'http://gh.nodejitsu.com/manifest.json'
		$confirm.append $p
		$confirm.append $nob
		$confirm.append $yesb
		# bind
		$('body').append $confirm
		$('a.yes', $confirm).click ->
			close()
			install()
		$('a.no', $confirm).click ->
			close()

	# all anchors are routes
	$ ->
		$('a').live 'click', (e) ->
			href = $(this).attr('href')
			if href
				router.navigate $(this).attr('href'), true
				e.preventDefault()

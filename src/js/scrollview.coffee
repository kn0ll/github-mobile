GH = ((gh) ->

	# only enable scrollview for touch devices
	return gh if not $.support.touch

	$ ->

		ps = '[data-role="page"]'
		$body = $ 'body'

		# resize the content views based on header size
		resize_scrollview = ($page) ->
			$c = $('[data-role="content"]', $page)
			hh = $('[data-role="header"]').outerHeight() || 0
			$c.height window.innerHeight - hh

		# so body is "fixed" and you can only scroll scrollview
		$body.css 'overflow', 'hidden'
		$body.bind 'touchmove', (e) ->
			e.preventDefault()
		
		# initiate the scrollview the first time 'modified' is called on/inside of it
		$(ps).one 'modified.scrollview', (e) ->
			$view = $ '[data-role="content"]', $ ps
			$view.scrollview direction: 'y'

		# update size on content modified
		$(ps).live 'modified.scrollview', (e) ->
			resize_scrollview $(e.target).closest ps

		# update size on orientation change
		$(ps).live 'orientationchange', ->
			setTimeout(->
				scrollTo 0, 1
				resize_scrollview $ ps
			, 500)

	gh

)(window['GH'] || {})
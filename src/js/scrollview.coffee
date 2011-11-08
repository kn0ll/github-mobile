GH = ((gh) ->

	# only enable scrollview for touch devices
	return gh if not ("ontouchend" of document)

	$ ->

		ps = '[data-role="page"]'
		$body = $ 'body'

		resize_scrollview = ($page) ->
			$c = $('[data-role="content"]', $page)
			hh = $('[data-role="header"]').outerHeight() || 0
			$c.height window.innerHeight - hh

		# so body is "fixed" and you can only scroll scrollview
		$body.css 'overflow', 'hidden'
		$body.bind 'touchmove', (e) ->
			e.preventDefault()
		
		$(ps).one 'pageshow.scrollview', (e) ->
			$view = $ '[data-role="content"]', $ ps
			$view.scrollview direction: 'y'
			resize_scrollview $(e.target).closest ps

		$(ps).live 'orientationchange', ->
			setTimeout(->
				scrollTo 0, 1
				resize_scrollview $ ps
			, 500)

	gh

)(window['GH'] || {})
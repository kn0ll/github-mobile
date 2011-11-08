GH = ((gh) ->

	# only enable scrollview for touch devices
	# return gh if not ("ontouchend" of document)

	$ ->

		ps = '[data-role="page"]'
		$win = $ window
		$body = $ 'body'

		resize_scrollview =  ($page) ->
			$c = $('[data-role="content"]', $page)
			hh = $('[data-role="header"]').outerHeight() || 0
			$c.height window.innerHeight - hh

		$body.css 'overflow', 'hidden'

		$win.bind 'touchmove', (e) ->
			e.preventDefault()

		$(ps).one 'pageshow.scrollview', (e) ->
			$view = $ '[data-role="content"]', $ this
			$view.scrollview()
			resize_scrollview $(e.target).closest ps

		$(ps).live 'orientationchange', ->
			setTimeout(->
				scrollTo 0, 1
				resize_scrollview $ '.ui-page'
			, 500)

	gh

)(window['GH'] || {})
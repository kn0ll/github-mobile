GH = ((gh) ->

	gh.Widgets ?= {}

	gh.Widgets.Scrollview = ($ps, offset) ->

		# only enable scrollview for touch devices
		return if not $.support.touch

		$body = $ 'body'

		# resize the content views based on header size
		resize_scrollview = ->
			$ps.height window.innerHeight - offset

		# so body is "fixed" and you can only scroll scrollview
		$body.css 'overflow', 'hidden'
		$body.bind 'touchmove', (e) ->
			e.preventDefault()
		
		# initiate the scrollview the first time 'modified' is called on/inside of it
		$ps.one 'modified.scrollview', (e) ->
			$view = $ps
			$view.scrollview direction: 'y'

		# update size on content modified
		$ps.live 'modified.scrollview', (e) ->
			resize_scrollview $ps

		# update size on orientation change
		$ps.live 'orientationchange', ->
			setTimeout(->
				scrollTo 0, 1
				resize_scrollview $ps
			, 500)

	gh

)(window['GH'] || {})
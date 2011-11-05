GH = ((gh) ->

	# only enable scrollview for touch devices
	return gh if not ('ontouchend' of document)

	$ ->

		s = '.scrollview'
		$doc = $ document

		# create each iscroll
		$(s).each ->
			$(this).data
				scrollview: new iScroll this
			
		# prevent scrolling the actual doc
		$doc.bind 'touchmove', (e) ->
			e.preventDefault()
		
		# trigger 'modified' from within scrollviews
		# to notify scrollview for refresh
		$doc.bind 'modified', (e) ->
			$(e.target).closest(s).data('scrollview').refresh()

	gh

)(window['GH'] || {})
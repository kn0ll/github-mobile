;var GH = (function(gh) {

	// only enable scrollview for touch devices
	if (!('ontouchend' in document)) {
		return gh;
	}

	$(function() {

		var s = '.scrollview',
			$doc = $(document);
		
		// create each scrollview
		$(s).each(function() {
			$(this).data({
				scrollview: new iScroll(this)
			});
		});

		// prevent scrolling the actual doc
		$doc.bind('touchmove', function(e) {
			e.preventDefault();
		});

		// trigger 'modified' from within scrollviews
		// to notify scrollview for refresh
		$doc.bind('modified', function(e) {
			$(e.target).closest(s).data('scrollview').refresh();
		});

	});

	return gh;

})(window['GH'] || {});
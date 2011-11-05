$(function() {
	
	if (!$.support.touch) {
		return false;
	}

	var $win = $(window),
		$header = $(':jqmData(role="header")'),
		$views = $(':jqmData(role="page")');
	
	function resize_scrollview($view) {
		$view.height($win.height() - ($header.outerHeight() || 0));
	}

	$views.each(function() {
		var $view = $(this);
		$view.scrollview({ direction: 'y' });
		resize_scrollview($view);
		$win.bind('orientationchange', function() {
			resize_scrollview($view);	
		});
	});
	
});
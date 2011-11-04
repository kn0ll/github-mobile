;(function() {

	var username = GH.User.get('login');

	// collections

	var News = Backbone.Collection.extend({
		url: _.sprintf('/v3/users/%s/received_events/public', username)
	});

	var Events = Backbone.Collection.extend({
		url: _.sprintf('/v3/users/%s/events', username)
	});

	var Repos = Backbone.Collection.extend({
		url: _.sprintf('/v3/users/%s/repos', username)
	});

	var Watched = Backbone.Collection.extend({
		url: _.sprintf('/v3/users/%s/watched', username)
	});

	// initiate collections

	(new News()).fetch({ success: function(news) {
		console.log(_.sprintf('%s\'s news', username), news);
	}});

	(new Repos()).fetch({ success: function(repos) {
		console.log(_.sprintf('%s\'s repos', username), repos);
	}});

	// scrollview

	(function() {

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

	})();
	
})();
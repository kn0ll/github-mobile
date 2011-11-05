$(function() {

	var username = GH.User.get('login');

	// give collections jsonp functionality

	Backbone.Collection = Backbone.Collection.extend({
		sync: function(method, model, options) {
			options.dataType = 'jsonp';
			options.url = _.sprintf('https://api.github.com%s', this.url);
			return Backbone.sync(method, model, options);
		},
		parse: function(resp, xhr) {
			return resp.data;
		}
	});

	// collections

	var News = Backbone.Collection.extend({
		url: _.sprintf('/users/%s/received_events/public', username)
	});

	var Events = Backbone.Collection.extend({
		url: _.sprintf('/users/%s/events', username)
	});

	var Repos = Backbone.Collection.extend({
		url: _.sprintf('/users/%s/repos', username)
	});

	var Watched = Backbone.Collection.extend({
		url: _.sprintf('/users/%s/watched', username)
	});

	// views
	
	var NewsView = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this);
			this.collection = new News();
			this.collection.fetch({ success: this.render });
		},
		render: function() {
			var self = this;
			$.get('/jst/events.jst', function(tmp) {
				self.el.empty().append(_.template(tmp, self));
			});
		}
	});

	new NewsView({
		el: $(':jqmData(role="content")', $('#news'))
	});

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
	
});
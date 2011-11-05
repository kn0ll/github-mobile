;var GH = (function(gh, username) {

	// give collections jsonp functionality
	var Base = Backbone.Collection.extend({
		sync: function(method, model, options) {
			options.dataType = 'jsonp';
			options.url = _.sprintf('https://api.github.com%s', this.url);
			return Backbone.sync(method, model, options);
		},
		parse: function(resp, xhr) {
			return resp.data;
		}
	});

	// define collections
	var Collections = function() {
		
	};

	Collections.prototype.News = Base.extend({
		url: _.sprintf('/users/%s/received_events/public', username)
	});

	Collections.prototype.Events = Base.extend({
		url: _.sprintf('/users/%s/events', username)
	});

	Collections.prototype.Repos = Base.extend({
		url: _.sprintf('/users/%s/repos', username)
	});

	Collections.prototype.Watched = Base.extend({
		url: _.sprintf('/users/%s/watched', username)
	});

	gh.Collections = new Collections();
	return gh;

})(window['GH'] || {}, GH.User.get('login'));
;var GH = (function(gh) {

	var Views = function() {
		
	};

	Views.prototype.News = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this);
			this.collection = new gh.Collections.News();
			this.collection.fetch({ success: this.render });
		},
		render: function() {
			var self = this;
			$.get('/jst/events.jst', function(tmp) {
				self.el.empty().append(_.template(tmp, self));
			});
		}
	});

	gh.Views = new Views();
	return gh;
	
})(window['GH'] || {});
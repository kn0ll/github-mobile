;var GH = (function(gh) {

	var Views = function() {
		
	};

	Views.prototype.Nav = Backbone.View.extend({
		events: {
			'click a': 'select'	
		},
		initialize: function() {
			var self = this;
			_.bindAll(this);
			this.model = new Backbone.Model({
				$selected: $('.selected', self.el)
			});
			this.model.bind('change:$selected', this.render);
		},
		select: function(e) {
			this.model.set({
				$selected: $(e.target)
			});
		},
		render: function(model, $selected) {
			var $prev = model.previous('$selected');
			if ($prev) {
				$prev.removeClass('selected');
			}
			$selected.addClass('selected');	
		}
	});

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
				self.el.trigger('modified');
			});
		}
	});

	gh.Views = new Views();
	return gh;
	
})(window['GH'] || {});
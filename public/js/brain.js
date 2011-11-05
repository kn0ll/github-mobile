$(function() {
	
	new GH.Views.News({
		el: $(':jqmData(role="content")', $('#news'))
	});

	var Header = Backbone.Model.extend({
		defaults: {
			$selected: false
		}
	});

	var HeaderView = Backbone.View.extend({
		events: {
			'mousedown a': 'highlight',
			'mouseup a': 'highlight',
			'click a': 'select'	
		},
		initialize: function() {
			var self = this;
			_.bindAll(this);
			this.model = new Header({
				$selected: $('.ui-btn-selected', self.el)
			});
			this.model.bind('change:$selected', this.render);
		},
		highlight: function(e) {
			$(e.target).toggleClass('ui-btn-active');	
		},
		select: function(e) {
			this.model.set({
				$selected: $(e.target)
			});
		},
		render: function(model, $selected) {
			var $prev = model.previous('$selected');
			if ($prev) {
				$prev.removeClass('ui-btn-selected');
			}
			$selected.addClass('ui-btn-selected');	
		}
	});

	new HeaderView({
		el: $('#header')
	});
	
});
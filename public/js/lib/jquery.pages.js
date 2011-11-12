(function($,window,document,undefined){

var Pages = function(element, options) {

	this.element = element;

	this._pages = [];

	this.options = $.extend({
	}, options);

	this._create();

};

$.extend(Pages.prototype, {

	_create: function() {
		console.log('creating pages controller for', $(this.element));
	},

	create: function(el) {
		var old_page = this._pages.shift();
		this._pages.push(el);
		this.element.append(el);
		el.css('position', 'absolute');
		// += 200 to give browser time to render element before it enters view
		el.css('left', $(window).width() + 1000);
		el.width($(window).width());
		el.animate({ left: 0 }, 900, 'easeOutQuad', function() {
			if (old_page) {
				old_page.remove();
			}
		});
	}

});

var Page = Backbone.View.extend({

		tagName: 'div',
		className: 'page',
		
		$container: false, // container el pages should be appended to
		offset: 0,		   // height offset of els outside the scrollview

		events: {
			'pagecreate': 'pagecreate' // triggered then the dom element is created
		},

		// set options and create element
		initialize: function(options) {
			_.bindAll(this);
			_.extend(this, options);
			this.build();
		},
			
		// create el in loading state
		build: function() {
			this.el = $(this.make(this.tagName, { className: this.className }));
			this.el.addClass('loading');
			// hide old views, show new view
			this.$container.empty();
			this.$container.append(this.el);
			// initiate scrollview
			GH.Widgets.Scrollview(this.el, this.offset);
			// notify widget was created
			this.pagecreate();
		},
		
		// individual views should override this to decide how to load content
		pagecreate: function() {
			
		},
		
		// default view render empties and re-populates this.el
		render: function() {
			var self = this;
			$.get(self.template, function(tmp) {
				self.el.empty();
				self.el.append(_.template(tmp, self));
				self.el.removeClass('loading');
				// notify scrollview of content change
				self.el.trigger('modified');
			});
		}

});

$.fn.pages = function(options) {

	return new Pages(this, options);

}

})(jQuery,window,document);
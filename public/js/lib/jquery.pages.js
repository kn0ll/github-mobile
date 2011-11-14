(function($,window,document,undefined){

var Pages = function(element, options) {

	this.element = element;

	this._pages = [];

	this.options = $.extend({
	}, options);

};

$.extend(Pages.prototype, {

	create: function(el) {
		var old_page = this._pages.shift();
		this._pages.push(el);
		this.element.append(el);
		el.css('position', 'absolute');
		el.css('left', $(window).width() + 1000);
		el.width($(window).width());
		el.animate({ left: 0 }, 900, 'easeOutQuad', function() {
			if (old_page) {
				old_page.remove();
			}
		});
	}

});

$.fn.pages = function(options) {

	return new Pages(this, options);

}

})(jQuery,window,document);
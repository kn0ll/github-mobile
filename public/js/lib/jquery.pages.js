(function($,window,document,undefined){

var Pages = function(element, options) {

	this.element = element;

	this._pages = [];

	this.options = $.extend({
	}, options);

};

var old_page;

$.extend(Pages.prototype, {

	create: function(el) {
		var old_page = this._pages.shift(),
			left = $(window).width();
		this._pages.push(el);
		this.element.append(el);
		el.css('position', 'absolute');
		el.css('left', left);
		el.width($(window).width());
		el.css({
			'-webkit-transition': '-webkit-transform 0.4s ease-in-out',
    		'-webkit-transform': 'translateX(-' + left + 'px)',
    		'-moz-transition': '-moz-transform 0.4s ease-in-out',
    		'-moz-transform': 'translate(-' + left + 'px)'
		});
		if (old_page) {
			old_page.css({
				'-webkit-transition': '-webkit-transform 0.4s ease-in-out',
	    		'-webkit-transform': 'translateX(-' + (left * 2) + 'px)',
				'-moz-transition': '-webkit-transform 0.4s ease-in-out',
	    		'-moz-transform': 'translate(-' + (left * 2) + 'px)'
			});
			(function(old) {
				setTimeout(function() {
					old.remove();	
				}, 400);
			})(old_page);
		}
		old_page = el;
	}

});

$.fn.pages = function(options) {

	return new Pages(this, options);

}

})(jQuery,window,document);
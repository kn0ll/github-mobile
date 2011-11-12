// $.waitjax([ajax], callback)
// $.waitjax($.get('/user'), $.get('/news'), function() { alert('done'); });

(function($, window, document, undefined) {

var Waiter = function() {

	if (!arguments.length) {
		return this;
	}

	var args = Array.prototype.slice.call(arguments),
		cb = args.pop();

	console.log(args);

	$.when.apply(this, args).then(cb);

};

$.waitjax = function() {

	return Waiter.apply(new Waiter(), arguments);

}

})(jQuery, window, document);
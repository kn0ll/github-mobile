;(function() {

	var username = GH.User.get('login');

	var EventsCollection = Backbone.Collection.extend({
		url: _.sprintf('/v3/users/%s/received_events/public', username)
	});

	var events = new EventsCollection();
	events.fetch({
		success: function(events) {
			console.log(_.sprintf('init %s', username), events);
		}
	});
	
})();

/*

$.get('/v3/users/catshirt/received_events/public', function(events) {
	console.log('events for you', events);
});

$.get('/v3/users/catshirt/events', function(events) {
	console.log('your events', events);
});

$.get('/v3/users/catshirt/repos', function(repos) {
	console.log('your repos', repos);
});

$.get('/v3/users/catshirt/watched', function(repos) {
	console.log('your watched repos', repos);
});

*/
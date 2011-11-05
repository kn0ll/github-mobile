GH = ((gh) ->

	Views = class

		Nav: class extends Backbone.View
			
			events:
				'click a': 'select'

			initialize: ->
				self = this
				_.bindAll this
				this.model = new Backbone.Model
					$selected: $('.selected', self.el)
				this.model.bind 'change:$selected', this.render

			select: (e) ->
				this.model.set
					$selected: $(e.target)

			render: (model, $selected) ->
				$prev = model.previous '$selected'
				$prev.removeClass 'selected' if $prev
				$selected.addClass 'selected'	

		News: class extends Backbone.View

			initialize: ->
				_.bindAll this
				this.collection = new gh.Collections.News
				this.collection.fetch success: this.render

			render: ->
				self = this;
				$.get '/jst/events.jst', (tmp) ->
					self.el.empty().append _.template(tmp, self)
					self.el.trigger 'modified'

	gh.Views = new Views
	gh

)(window['GH'] || {})
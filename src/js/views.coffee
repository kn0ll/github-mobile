GH = ((gh) ->

	PageView = class extends Backbone.View

		events:
			'pagecreate': 'pagecreate'

		initialize: ->
			_.bindAll this
			console.log this.el
			this.$content = $ ':jqmData(role="content")', this.el
		
		pagecreate: ->

		render: ->
			self = this
			console.log 'rendering', this.template
			$.get this.template, (tmp) ->
				self.$content.empty().append _.template tmp, self
				self.$content.trigger 'pageshow.scrollview'


	Views = class

		Nav: class extends Backbone.View
			
			events:
				'click a': 'select'

			initialize: ->
				self = this
				_.bindAll this
				this.model = new Backbone.Model
					$selected: $ '.selected', self.el
				this.model.bind 'change:$selected', this.render

			select: (e) ->
				this.model.set
					$selected: $(e.target).closest 'a'

			render: (model, $selected) ->
				$prev = model.previous '$selected'
				$prev.removeClass 'selected' if $prev
				$selected.addClass 'selected'	

		News: class extends PageView

			template: '/jst/events.jst'

			pagecreate: ->
				this.collection = new gh.Collections.News
				this.collection.fetch success: this.render

		Profile: class extends PageView

			template: '/jst/profile.jst'

			pagecreate: ->
				this.model = gh.User
				this.render()

	gh.Views = new Views
	gh

)(window['GH'] || {})
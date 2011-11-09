GH = ((gh) ->

	PageView = class extends Backbone.View

		tagName: 'div'
		className: 'page'
		
		$container: false # container el pages should be appended to
		offset: 0		  # height offset of els outside the scrollview

		events:
			'pagecreate': 'pagecreate' # triggered then the dom element is created

		initialize: (options) ->
			_.bindAll this
			_.extend this, options
			this.build()
			
		build: ->
			this.el = $(this.make this.tagName, class: this.className)
			this.el.addClass 'loading'
			this.$container.append this.el
			GH.Widgets.Scrollview this.el, this.offset
			this.pagecreate()
		
		pagecreate: ->

		render: ->
			self = this
			el = self.el
			$.get self.template, (tmp) ->
				el.empty()
				el.append _.template(tmp, self)
				el.removeClass 'loading'
				el.trigger 'modified'

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

			selectByHref: (href) ->
				this.model.set
					$selected: $ "a[href='#{href}']", this.el

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
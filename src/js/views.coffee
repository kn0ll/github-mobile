GH = ((gh) ->

	PageView = class extends Backbone.View

		tagName: 'div'
		className: 'loading page'

		# height offset to subtract from window height
		offset: 0

		# save options and init el creation
		initialize: (options) ->
			_.bindAll this
			_.extend this, options
			this.build()
			
		# create el in loading state
		build: ->
			this.el = $(this.make this.tagName, class: this.className)
			# notify widget was created
			this.pagecreate()
			# scrollview-ify
			this.el.scrollview direction: 'y', offset: this.offset
		
		# individual views should override this to decide how to load content
		pagecreate: ->
		
		# default view render empties and re-populates this.el
		render: ->
			self = this
			$.get self.template, (tmp) =>
				self.el.empty()
				self.el.append _.template(tmp, this)
				self.el.removeClass 'loading'
				# notify scrollview of content change
				self.el.trigger 'modified'
		
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

			initialize: (options) ->
				this.collection = new gh.Collections.News null,
					user: User
				PageView.prototype.initialize.call this, options

			pagecreate: ->
				$.waitjax this.collection.fetch(), =>
					this.render()

		Profile: class extends PageView

			template: '/jst/profile.jst'

			initialize: (options) ->
				this.user = new GH.Models.User
					login: options.username
				this.repos = new GH.Collections.Repos null,
					user: this.user
				PageView.prototype.initialize.call this, options

			pagecreate: =>
				$.waitjax this.repos.fetch(), this.user.fetch(), =>
					this.render()

	gh.Views = new Views
	gh

)(window['GH'] || {})
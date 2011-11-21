GH = ((gh) ->

	PageView = class extends Backbone.View

		tagName: 'div'
		className: 'loading page'

		# save options and init el creation
		initialize: (options) ->
			_.bindAll this
			_.extend this, options
			@build()
			
		# create el in loading state
		build: ->
			@el = $(@make @tagName, class: @className)
			# notify widget was created
			@pagecreate()
			# scrollview-ify
			@el.scrollview direction: 'y'
		
		# individual views should override this to decide how to load content
		pagecreate: ->
		
		# default view render empties and re-populates @el
		render: (cb) ->
			self = this
			$.get self.template, (tmp) =>
				self.el.empty()
				self.el.append _.template(tmp, this)
				self.el.removeClass 'loading'
				# notify scrollview of content change
				self.el.trigger 'modified'
				@delegateEvents()
				cb() if cb
		
	Views = class

		Nav: class extends Backbone.View
			
			events:
				'click a': 'select'

			initialize: ->
				self = this
				_.bindAll this
				@model = new Backbone.Model
					$selected: $ '.selected', self.el
				@model.bind 'change:$selected', @render

			select: (e) ->
				@model.set
					$selected: $(e.target).closest 'a'

			selectByHref: (href) ->
				@model.set
					$selected: $ "a[href='#{href}']", @el

			render: (model, $selected) ->
				$prev = model.previous '$selected'
				$prev.removeClass 'selected' if $prev
				$selected.addClass 'selected'	

		News: class extends PageView

			template: '/jst/events.jst'

			initialize: (options) ->
				@user = options.user || new GH.Models.User
					login: options.username
				@actions = new gh.Collections.News null,
					user: @user
				PageView.prototype.initialize.call this, options

			pagecreate: ->
				$.waitjax @actions.fetch(), =>
					@render()

		Repo: class extends PageView

			template: '/jst/repo.jst'

			initialize: (options) ->
				@repo = options.repo || new GH.Models.Repo
					name: options.name
				@readme = new GH.Models.Readme
					repo: @repo
				PageView.prototype.initialize.call this, options

			pagecreate: ->
				ops = []
				ops.push @repo.fetch()
				ops.push @readme.fetch()
				ops.push =>
					console.log @readme
					@render()
				$.waitjax.apply null, ops
					

		Profile: class extends PageView

			template: '/jst/profile.jst'

			events:
				'click .tabs a': 'selectTab'

			initialize: (options) ->
				@user = options.user || new GH.Models.User
					login: options.username
				@repos = new GH.Collections.Repos null,
					user: @user
				@actions = new gh.Collections.Actions null,
					user: @user
				PageView.prototype.initialize.call this, options

			pagecreate: =>
				ops = []
				ops.push @user.fetch()
				ops.push @repos.fetch()
				ops.push @actions.fetch()
				ops.push =>
					$.get '/jst/events.jst', (tmp) =>
						@events_html = _.template(tmp, this)
						@render =>
							@$a = $ '.tabs a', @el
							@$tabs = $ '.tab-sections > *', @el
				$.waitjax.apply null, ops

			selectTab: (e) =>
				$a = $ e.target
				tab_name = $a.data 'tab'
				$tab = @$tabs.filter ".#{tab_name}"
				@$a.removeClass 'active' if @$a
				$a.addClass 'active'
				@$a = $a
				@$tabs.hide()
				$tab.show()

	gh.Views = new Views
	gh

)(window['GH'] || {})
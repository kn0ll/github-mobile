(function() {
  var GH;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  GH = (function(gh) {
    var PageView, Views;
    PageView = (function() {

      __extends(_Class, Backbone.View);

      function _Class() {
        _Class.__super__.constructor.apply(this, arguments);
      }

      _Class.prototype.tagName = 'div';

      _Class.prototype.className = 'loading page';

      _Class.prototype.initialize = function(options) {
        _.bindAll(this);
        _.extend(this, options);
        return this.build();
      };

      _Class.prototype.build = function() {
        this.el = $(this.make(this.tagName, {
          "class": this.className
        }));
        this.pagecreate();
        return this.el.scrollview({
          direction: 'y'
        });
      };

      _Class.prototype.pagecreate = function() {};

      _Class.prototype.render = function(cb) {
        var self;
        var _this = this;
        self = this;
        return $.get(self.template, function(tmp) {
          self.el.empty();
          self.el.append(_.template(tmp, _this));
          self.el.removeClass('loading');
          self.el.trigger('modified');
          _this.delegateEvents();
          if (cb) return cb();
        });
      };

      return _Class;

    })();
    Views = (function() {

      function _Class() {}

      _Class.prototype.Nav = (function() {

        __extends(_Class, Backbone.View);

        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.prototype.events = {
          'click a': 'select'
        };

        _Class.prototype.initialize = function() {
          var self;
          self = this;
          _.bindAll(this);
          this.model = new Backbone.Model({
            $selected: $('.selected', self.el)
          });
          return this.model.bind('change:$selected', this.render);
        };

        _Class.prototype.select = function(e) {
          return this.model.set({
            $selected: $(e.target).closest('a')
          });
        };

        _Class.prototype.selectByHref = function(href) {
          return this.model.set({
            $selected: $("a[href='" + href + "']", this.el)
          });
        };

        _Class.prototype.render = function(model, $selected) {
          var $prev;
          $prev = model.previous('$selected');
          if ($prev) $prev.removeClass('selected');
          return $selected.addClass('selected');
        };

        return _Class;

      })();

      _Class.prototype.News = (function() {

        __extends(_Class, PageView);

        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.prototype.template = '/jst/events.jst';

        _Class.prototype.initialize = function(options) {
          this.user = options.user || new GH.Models.User({
            login: options.username
          });
          this.actions = new gh.Collections.News(null, {
            user: this.user
          });
          return PageView.prototype.initialize.call(this, options);
        };

        _Class.prototype.pagecreate = function() {
          var _this = this;
          return $.waitjax(this.actions.fetch(), function() {
            return _this.render();
          });
        };

        return _Class;

      })();

      _Class.prototype.Repo = (function() {

        __extends(_Class, PageView);

        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.prototype.template = '/jst/repo.jst';

        _Class.prototype.initialize = function(options) {
          this.repo = options.repo || new GH.Models.Repo({
            name: options.name
          });
          this.readme = new GH.Models.Readme({
            repo: this.repo
          });
          return PageView.prototype.initialize.call(this, options);
        };

        _Class.prototype.pagecreate = function() {
          var ops;
          var _this = this;
          ops = [];
          ops.push(this.repo.fetch());
          ops.push(this.readme.fetch());
          ops.push(function() {
            console.log(_this.readme);
            return _this.render();
          });
          return $.waitjax.apply(null, ops);
        };

        return _Class;

      })();

      _Class.prototype.Profile = (function() {

        __extends(_Class, PageView);

        function _Class() {
          this.selectTab = __bind(this.selectTab, this);
          this.pagecreate = __bind(this.pagecreate, this);
          _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.prototype.template = '/jst/profile.jst';

        _Class.prototype.events = {
          'click .tabs a': 'selectTab'
        };

        _Class.prototype.initialize = function(options) {
          this.user = options.user || new GH.Models.User({
            login: options.username
          });
          this.repos = new GH.Collections.Repos(null, {
            user: this.user
          });
          this.actions = new gh.Collections.Actions(null, {
            user: this.user
          });
          return PageView.prototype.initialize.call(this, options);
        };

        _Class.prototype.pagecreate = function() {
          var ops;
          var _this = this;
          ops = [];
          ops.push(this.user.fetch());
          ops.push(this.repos.fetch());
          ops.push(this.actions.fetch());
          ops.push(function() {
            return $.get('/jst/events.jst', function(tmp) {
              _this.events_html = _.template(tmp, _this);
              return _this.render(function() {
                _this.$a = $('.tabs a', _this.el);
                return _this.$tabs = $('.tab-sections > *', _this.el);
              });
            });
          });
          return $.waitjax.apply(null, ops);
        };

        _Class.prototype.selectTab = function(e) {
          var $a, $tab, tab_name;
          $a = $(e.target);
          tab_name = $a.data('tab');
          $tab = this.$tabs.filter("." + tab_name);
          if (this.$a) this.$a.removeClass('active');
          $a.addClass('active');
          this.$a = $a;
          this.$tabs.hide();
          return $tab.show();
        };

        return _Class;

      })();

      return _Class;

    }).call(this);
    gh.Views = new Views;
    return gh;
  })(window['GH'] || {});

}).call(this);

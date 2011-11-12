(function() {
  var GH;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  GH = (function(gh) {
    var PageView, Views;
    PageView = (function() {
      __extends(_Class, Backbone.View);
      function _Class() {
        _Class.__super__.constructor.apply(this, arguments);
      }
      _Class.prototype.tagName = 'div';
      _Class.prototype.className = 'page';
      _Class.prototype.offset = 0;
      _Class.prototype.events = {
        'pagecreate': 'pagecreate'
      };
      _Class.prototype.initialize = function(options) {
        _.bindAll(this);
        _.extend(this, options);
        return this.build();
      };
      _Class.prototype.build = function() {
        this.el = $(this.make(this.tagName, {
          "class": this.className
        }));
        this.el.addClass('loading');
        GH.Widgets.Scrollview(this.el, this.offset);
        return this.pagecreate();
      };
      _Class.prototype.pagecreate = function() {};
      _Class.prototype.render = function() {
        var self;
        self = this;
        return $.get(self.template, __bind(function(tmp) {
          self.el.empty();
          self.el.append(_.template(tmp, this));
          self.el.removeClass('loading');
          return self.el.trigger('modified');
        }, this));
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
            $selected: $("a[href='" + href + "']")
          }, this.el);
        };
        _Class.prototype.render = function(model, $selected) {
          var $prev;
          $prev = model.previous('$selected');
          if ($prev) {
            $prev.removeClass('selected');
          }
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
        _Class.prototype.pagecreate = function() {
          this.collection = new gh.Collections.News;
          return this.collection.fetch({
            success: this.render
          });
        };
        return _Class;
      })();
      _Class.prototype.Profile = (function() {
        __extends(_Class, PageView);
        function _Class() {
          this.pagecreate = __bind(this.pagecreate, this);
          _Class.__super__.constructor.apply(this, arguments);
        }
        _Class.prototype.template = '/jst/profile.jst';
        _Class.prototype.pagecreate = function() {
          return $.waitjax(this.user.fetch(), __bind(function() {
            return this.render();
          }, this));
        };
        return _Class;
      })();
      return _Class;
    }).call(this);
    gh.Views = new Views;
    return gh;
  })(window['GH'] || {});
}).call(this);

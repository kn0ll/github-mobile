(function() {
  var GH;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  GH = (function(gh) {
    var Views;
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
        __extends(_Class, Backbone.View);
        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }
        _Class.prototype.initialize = function() {
          _.bindAll(this);
          this.collection = new gh.Collections.News;
          return this.collection.fetch({
            success: this.render
          });
        };
        _Class.prototype.render = function() {
          var self;
          self = this;
          return $.get('/jst/events.jst', function(tmp) {
            self.el.empty().append(_.template(tmp, self));
            return self.el.trigger('modified');
          });
        };
        return _Class;
      })();
      return _Class;
    })();
    gh.Views = new Views;
    return gh;
  })(window['GH'] || {});
}).call(this);

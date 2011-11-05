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
  GH = (function(gh, username) {
    var Base, Collections;
    username = gh.User.get('login');
    Base = (function() {
      __extends(_Class, Backbone.Collection);
      function _Class() {
        _Class.__super__.constructor.apply(this, arguments);
      }
      _Class.prototype.sync = function(method, model, options) {
        options.dataType = 'jsonp';
        options.url = _.sprintf('https://api.github.com%s', this.url);
        return Backbone.sync(method, model, options);
      };
      _Class.prototype.parse = function(res) {
        return res.data;
      };
      return _Class;
    })();
    Collections = (function() {
      function _Class() {}
      _Class.prototype.News = (function() {
        __extends(_Class, Base);
        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }
        _Class.prototype.url = _.sprintf('/users/%s/received_events/public', username);
        return _Class;
      })();
      _Class.prototype.Events = (function() {
        __extends(_Class, Base);
        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }
        _Class.prototype.url = _.sprintf('/users/%s/events', username);
        return _Class;
      })();
      _Class.prototype.Repos = (function() {
        __extends(_Class, Base);
        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }
        _Class.prototype.url = _.sprintf('/users/%s/repos', username);
        return _Class;
      })();
      _Class.prototype.Watched = (function() {
        __extends(_Class, Base);
        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }
        _Class.prototype.url = _.sprintf('/users/%s/watched', username);
        return _Class;
      })();
      return _Class;
    })();
    gh.Collections = new Collections;
    return gh;
  })(window['GH'] || {});
}).call(this);

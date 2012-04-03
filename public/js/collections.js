(function() {
  var GH;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  GH = (function(gh) {
    var Base, Collections;
    Base = (function() {

      __extends(_Class, Backbone.Collection);

      function _Class() {
        _Class.__super__.constructor.apply(this, arguments);
      }

      _Class.prototype.initialize = function(models, options) {
        return this.url = this.url(options.user.get('login'));
      };

      _Class.prototype.sync = function(method, model, options) {
        options.dataType = 'jsonp';
        options.url = "https://api.github.com" + this.url;
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

        _Class.prototype.url = function(login) {
          return "/users/" + login + "/received_events/public";
        };

        return _Class;

      })();

      _Class.prototype.Actions = (function() {

        __extends(_Class, Base);

        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.prototype.url = function(login) {
          return "/users/" + login + "/events/public";
        };

        return _Class;

      })();

      _Class.prototype.Repos = (function() {

        __extends(_Class, Base);

        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.prototype.url = function(login) {
          return "/users/" + login + "/repos";
        };

        return _Class;

      })();

      _Class.prototype.Watched = (function() {

        __extends(_Class, Base);

        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.prototype.url = function(login) {
          return "/users/" + login + "/watched";
        };

        return _Class;

      })();

      return _Class;

    })();
    gh.Collections = new Collections;
    return gh;
  })(window['GH'] || {});

}).call(this);

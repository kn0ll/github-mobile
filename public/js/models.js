(function() {
  var GH;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  GH = (function(gh) {
    var Base, Models;
    Base = (function() {

      __extends(_Class, Backbone.Model);

      function _Class() {
        _Class.__super__.constructor.apply(this, arguments);
      }

      _Class.prototype.fetch = function(options) {
        var _ref;
        if (options == null) options = {};
        if ((_ref = options.dataType) == null) options.dataType = 'jsonp';
        return Backbone.Model.prototype.fetch.call(this, options);
      };

      _Class.prototype.parse = function(res) {
        return res.data;
      };

      return _Class;

    })();
    Models = (function() {

      function _Class() {}

      _Class.prototype.User = (function() {

        __extends(_Class, Base);

        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.prototype.defaults = {
          login: false
        };

        _Class.prototype.url = function() {
          var username;
          username = this.get('login');
          return "https://api.github.com/users/" + username;
        };

        return _Class;

      })();

      _Class.prototype.Repo = (function() {

        __extends(_Class, Base);

        function _Class() {
          _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.prototype.defaults = {
          name: false
        };

        _Class.prototype.url = function() {
          var name;
          name = this.get('name');
          return "https://api.github.com/repos/" + name;
        };

        return _Class;

      })();

      _Class.prototype.Readme = (function() {

        __extends(_Class, Base);

        function _Class() {
          this.url = __bind(this.url, this);
          _Class.__super__.constructor.apply(this, arguments);
        }

        _Class.prototype.defaults = {
          repo: false
        };

        _Class.prototype.url = function() {
          var name;
          name = this.get('repo').get('name');
          return "/api/repos/" + name + "/readme";
        };

        _Class.prototype.parse = function(res) {
          return res;
        };

        return _Class;

      })();

      return _Class;

    }).call(this);
    gh.Models = new Models;
    return gh;
  })(window['GH'] || {});

}).call(this);

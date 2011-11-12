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
    var Base, Models;
    Base = (function() {
      __extends(_Class, Backbone.Model);
      function _Class() {
        _Class.__super__.constructor.apply(this, arguments);
      }
      _Class.prototype.fetch = function(options) {
        if (options == null) {
          options = {};
        }
        options.dataType = 'jsonp';
        options.url = "https://api.github.com" + (this.url());
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
          return "/users/" + username;
        };
        return _Class;
      })();
      return _Class;
    })();
    gh.Models = new Models;
    return gh;
  })(window['GH'] || {});
}).call(this);

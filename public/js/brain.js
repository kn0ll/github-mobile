(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  $(function() {
    var Nav, News, Profile, Router, router;
    Nav = new GH.Views.Nav({
      el: $('#nav')
    });
    News = new GH.Views.News({
      el: $('#news')
    });
    Profile = new GH.Views.Profile({
      el: $('#profile')
    });
    News.el.trigger('pagecreate');
    Profile.el.trigger('pagecreate');
    Router = (function() {
      __extends(_Class, Backbone.Router);
      function _Class() {
        _Class.__super__.constructor.apply(this, arguments);
      }
      _Class.prototype.routes = {
        '': 'index',
        '/': 'index',
        '/news': 'news',
        '/profile': 'profile'
      };
      _Class.prototype.index = function() {
        return console.log('wat');
      };
      _Class.prototype.news = function() {
        return Nav.selectByHref('/news');
      };
      _Class.prototype.profile = function() {
        return Nav.selectByHref('/profile');
      };
      return _Class;
    })();
    router = new Router;
    Backbone.history.start();
    return $(function() {
      var route;
      route = function(href) {
        return router.navigate(href, true);
      };
      return $('a').click(function(e) {
        route($(this).attr('href'));
        return e.preventDefault();
      });
    });
  });
}).call(this);

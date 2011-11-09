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
    var Nav, Router, pages, router;
    pages = $('#content').pages();
    Nav = new GH.Views.Nav({
      el: $('#nav')
    });
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
        return console.log('routed: index');
      };
      _Class.prototype.news = function() {
        var el;
        Nav.selectByHref('/news');
        el = (new GH.Views.News({
          offset: Nav.el.height()
        })).el;
        if (pages) {
          return pages.create(el);
        }
      };
      _Class.prototype.profile = function() {
        var el;
        Nav.selectByHref('/profile');
        el = (new GH.Views.Profile({
          offset: Nav.el.height()
        })).el;
        if (pages) {
          return pages.create(el);
        }
      };
      return _Class;
    })();
    router = new Router;
    Backbone.history.start();
    return $(function() {
      return $('a').live('click', function(e) {
        router.navigate($(this).attr('href'), true);
        return e.preventDefault();
      });
    });
  });
}).call(this);

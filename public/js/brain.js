(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $(function() {
    var Nav, Router, manifest, pages, router;
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
        '': 'news',
        '/': 'news',
        '/news': 'news',
        '/:username': 'profile',
        '/:username/:repository': 'repo'
      };

      _Class.prototype.news = function() {
        var news;
        news = new GH.Views.News({
          user: User
        });
        Nav.selectByHref('/news');
        if (pages) return pages.create(news.el);
      };

      _Class.prototype.profile = function(username) {
        var profile;
        profile = new GH.Views.Profile({
          username: username
        });
        if (username === User.get('login')) Nav.selectByHref("/" + username);
        if (pages) return pages.create(profile.el);
      };

      _Class.prototype.repo = function(username, repository) {
        var repo;
        repo = new GH.Views.Repo({
          name: "" + username + "/" + repository
        });
        if (pages) return pages.create(repo.el);
      };

      return _Class;

    })();
    router = new Router;
    Backbone.history.start();
    manifest = 'http://gh.nodejitsu.com/manifest.json';
    if (confirm('Wow! You\'re totally on B2G!! Install this one your home screen?')) {
      alert('Thanks!!');
    }
    return $(function() {
      return $('a').live('click', function(e) {
        var href;
        href = $(this).attr('href');
        if (href) {
          router.navigate($(this).attr('href'), true);
          return e.preventDefault();
        }
      });
    });
  });

}).call(this);

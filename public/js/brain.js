(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $(function() {
    var $confirm, $nob, $p, $yesb, Nav, Router, bcss, close, install, pages, router;
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
    if (navigator.mozApps) {
      bcss = {
        'padding': '10px 20px',
        'background': '#666',
        'border-radius': '4px',
        'color': '#fff',
        'margin-right': '15px'
      };
      $nob = $('<a class="no" href="#">No</a>').css(bcss);
      $yesb = $('<a class="yes" href="#">Yes</a>').css(bcss);
      $confirm = $('<div id="confirm" />').css({
        'border-radius': '4px',
        'box-sizing': 'border-box',
        'position': 'absolute',
        'width': '100%',
        'background': '#bbb',
        'padding': '15px 15px 20px',
        'margin': '10px'
      });
      $p = $('<p>Wow! You\'re totally on B2G!! Install this one your home screen?</p>').css({
        'margin': '0 0 20px'
      });
      close = function() {
        return $confirm.remove();
      };
      install = function() {
        return navigator.mozApps.install('http://gh.nodejitsu.com/manifest.json');
      };
      $confirm.append($p);
      $confirm.append($nob);
      $confirm.append($yesb);
      $('body').append($confirm);
      $('a.yes', $confirm).click(function() {
        close();
        return install();
      });
      $('a.no', $confirm).click(function() {
        return close();
      });
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

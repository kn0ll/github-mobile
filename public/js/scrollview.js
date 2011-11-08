(function() {
  var GH;
  GH = (function(gh) {
    $(function() {
      var $body, $win, ps, resize_scrollview;
      ps = '[data-role="page"]';
      $win = $(window);
      $body = $('body');
      resize_scrollview = function($page) {
        var $c, hh;
        $c = $('[data-role="content"]', $page);
        hh = $('[data-role="header"]').outerHeight() || 0;
        return $c.height(window.innerHeight - hh);
      };
      $body.css('overflow', 'hidden');
      $win.bind('touchmove', function(e) {
        return e.preventDefault();
      });
      $(ps).one('pageshow.scrollview', function(e) {
        var $view;
        $view = $('[data-role="content"]', $(this));
        $view.scrollview();
        return resize_scrollview($(e.target).closest(ps));
      });
      return $(ps).live('orientationchange', function() {
        return setTimeout(function() {
          scrollTo(0, 1);
          return resize_scrollview($('.ui-page'));
        }, 500);
      });
    });
    return gh;
  })(window['GH'] || {});
}).call(this);

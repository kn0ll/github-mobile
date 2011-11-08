(function() {
  var GH;
  GH = (function(gh) {
    if (!$.support.touch) {
      return gh;
    }
    $(function() {
      var $body, $win, ps, resize_scrollview;
      ps = ':jqmData(role="page")';
      $win = $(window);
      $body = $('body');
      resize_scrollview = function($page) {
        var $c, hh;
        $c = $(':jqmData(role="content")', $page);
        hh = $(':jqmData(role="header")').outerHeight() || 0;
        return $c.height(window.innerHeight - hh);
      };
      $body.css('overflow', 'hidden');
      $win.bind('touchmove', function(e) {
        return e.preventDefault();
      });
      $(ps).one('pageshow.scrollview', function(e) {
        var $view;
        $view = $('[data-role="content"]', $(this));
        $view.scrollview({
          direction: 'y'
        });
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

(function() {
  var GH;
  GH = (function(gh) {
    if (!("ontouchend" in document)) {
      return gh;
    }
    $(function() {
      var $body, ps, resize_scrollview;
      ps = '[data-role="page"]';
      $body = $('body');
      resize_scrollview = function($page) {
        var $c, hh;
        $c = $('[data-role="content"]', $page);
        hh = $('[data-role="header"]').outerHeight() || 0;
        return $c.height(window.innerHeight - hh);
      };
      $body.css('overflow', 'hidden');
      $body.bind('touchmove', function(e) {
        return e.preventDefault();
      });
      $(ps).one('pageshow.scrollview', function(e) {
        var $view;
        $view = $('[data-role="content"]', $(ps));
        $view.scrollview({
          direction: 'y'
        });
        return resize_scrollview($(e.target).closest(ps));
      });
      return $(ps).live('orientationchange', function() {
        return setTimeout(function() {
          scrollTo(0, 1);
          return resize_scrollview($(ps));
        }, 500);
      });
    });
    return gh;
  })(window['GH'] || {});
}).call(this);

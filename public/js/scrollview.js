(function() {
  var GH;
  GH = (function(gh) {
    if (!$.support.touch) {
      return gh;
    }
    $(function() {
      var $body, ps, resize_scrollview;
      ps = '.page';
      $body = $('body');
      resize_scrollview = function($page) {
        var $c, hh;
        $c = $('.content', $page);
        hh = $('#nav').outerHeight() || 0;
        return $c.height(window.innerHeight - hh);
      };
      $body.css('overflow', 'hidden');
      $body.bind('touchmove', function(e) {
        return e.preventDefault();
      });
      $(ps).one('modified.scrollview', function(e) {
        var $view;
        $view = $('.content', $(ps));
        return $view.scrollview({
          direction: 'y'
        });
      });
      $(ps).live('modified.scrollview', function(e) {
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

(function() {
  var GH;
  GH = (function(gh) {
    var _ref;
    if ((_ref = gh.Widgets) == null) {
      gh.Widgets = {};
    }
    gh.Widgets.Scrollview = function($ps, offset) {
      var $body, resize_scrollview;
      if (!$.support.touch) {
        return;
      }
      $body = $('body');
      resize_scrollview = function() {
        return $ps.height(window.innerHeight - offset);
      };
      $body.css('overflow', 'hidden');
      $body.bind('touchmove', function(e) {
        return e.preventDefault();
      });
      $ps.one('modified.scrollview', function(e) {
        var $view;
        $view = $ps;
        return $view.scrollview({
          direction: 'y'
        });
      });
      $ps.live('modified.scrollview', function(e) {
        return resize_scrollview($ps);
      });
      return $ps.live('orientationchange', function() {
        return setTimeout(function() {
          scrollTo(0, 1);
          return resize_scrollview($ps);
        }, 500);
      });
    };
    return gh;
  })(window['GH'] || {});
}).call(this);

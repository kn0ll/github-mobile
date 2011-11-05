(function() {
  var GH;
  GH = (function(gh) {
    if (!('ontouchend' in document)) {
      return gh;
    }
    $(function() {
      var $doc, s;
      s = '.scrollview';
      $doc = $(document);
      $(s).each(function() {
        return $(this).data({
          scrollview: new iScroll(this)
        });
      });
      $doc.bind('touchmove', function(e) {
        return e.preventDefault();
      });
      return $doc.bind('modified', function(e) {
        return $(e.target).closest(s).data('scrollview').refresh();
      });
    });
    return gh;
  })(window['GH'] || {});
}).call(this);

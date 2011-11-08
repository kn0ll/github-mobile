(function() {
  $(function() {
    new GH.Views.Nav({
      el: $('#nav')
    });
    new GH.Views.News({
      el: $('#news')
    });
    return new GH.Views.Profile({
      el: $('#profile')
    });
  });
}).call(this);

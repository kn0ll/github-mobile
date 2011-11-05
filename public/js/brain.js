(function() {
  $(function() {
    new GH.Views.Nav({
      el: $('#nav')
    });
    return new GH.Views.News({
      el: $('#news .content')
    });
  });
}).call(this);

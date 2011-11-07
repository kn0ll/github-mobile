(function() {
  $(function() {
    new GH.Views.Nav({
      el: $('#nav')
    });
    return new GH.Views.News({
      el: $(':jqmData(role="content")', '#news')
    });
  });
}).call(this);

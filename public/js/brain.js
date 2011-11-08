(function() {
  $(function() {
    var News, Profile;
    new GH.Views.Nav({
      el: $('#nav')
    });
    News = new GH.Views.News({
      el: $('#news')
    });
    Profile = new GH.Views.Profile({
      el: $('#profile')
    });
    News.el.trigger('pagecreate');
    return Profile.el.trigger('pagecreate');
  });
}).call(this);

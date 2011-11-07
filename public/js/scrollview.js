(function() {
  var GH;
  GH = (function(gh) {
    if (!$.support.touch) {
      return gh;
    }
    $(function() {
      var $doc, s;
      s = '.scrollview';
      return $doc = $(document);
      /* create each iscroll
      		$(s).each ->
      			$(this).data scrollview: new iScroll this
      			
      		# prevent scrolling the actual doc
      		$doc.bind 'touchmove', (e) ->
      			e.preventDefault()
      		
      		# trigger 'modified' from within scrollviews
      		# to notify scrollview for refresh
      		$doc.bind 'modified', (e) ->
      			$(e.target).closest(s).data('scrollview').refresh()
      		*/
    });
    return gh;
  })(window['GH'] || {});
}).call(this);

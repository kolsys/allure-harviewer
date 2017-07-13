(function() {
  var harViewer = Backbone.Marionette.View.extend({
    className: 'pane__section',
    events: {
      'click .harviewer__link': 'viewHar',
    },
    viewHar: function(event) {
      var x = window.open('', '', 'location=no,toolbar=no,scrollbars=yes');
      x.document.write('<html><head>'+
        '<link rel="stylesheet" href="https://gitgrimbo.github.io/harviewer/master/css/harViewer.css" type="text/css">'+
        '<script src="https://gitgrimbo.github.io/harviewer/master/scripts/jquery.js"></script>'+
        '</head>'+
        '<body>'+
        '  <div id="content"></div>'+
        '  <script data-main="https://gitgrimbo.github.io/harviewer/master/scripts/harViewer.js" src="https://gitgrimbo.github.io/harviewer/master/scripts/require.js"></script>'+
        '  <script>'+
        '  $("#content").bind("onViewerPreInit", function(event) {'+
        '    var viewer = event.target.repObject;'+
        '    viewer.removeTab("Home");'+
        '    viewer.removeTab("About");'+
        '    viewer.removeTab("Schema");'+
        '    viewer.removeTab("HAR");'+
        '    viewer.showTabBar(false);'+
        '  }).bind("onViewerInit", function(event) {'+
        '    var viewer = event.target.repObject;'+
        '    var file = location.hash.substr(1);'+
        '    viewer.loadHar("'+jQuery(event.currentTarget || event.target).data('har')+'");'+
        '  });'+
        '  </script>'+
        '</body>'+
        '</html>');
    },
    template: function (data) {
      var links = [];
      for (var i in data.testStage.attachments) {
        var attach = data.testStage.attachments[i];
        if (attach.name.match(/\.har$/)) {
          links.push({url: 'data/attachments/'+attach.source, name: attach.name});
        }
      }
      if (links.length) {
        var ret = '<h3 class="pane__section-title">Inspect requests</h3>' +
            '<div class="harviewer__content">';
        for (var i in links) {
          ret += '<div class="harviewer__link step__title step__title_hasContent long-line" '+
              'data-har="'+links[i].url+'">'+
            '<span class="step__arrow block__arrow">'+
            '<span class="fa fa-chevron-right fa-fw text_status_passed"></span></span>'+
            '<div class="step__name">'+
            links[i].name+
            '</div>';
        }
        ret += '</div></div>';
        return ret;
      }
    }
  });
  allure.api.addTestcaseBlock(harViewer, {position: 'before'});
})();

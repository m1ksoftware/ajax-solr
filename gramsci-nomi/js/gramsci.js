var Manager;

(function ($) {

  $(function () {

    Manager = new AjaxSolr.ApiManager({
      //solrUrl: 'http://gramsciproject.org:8080/solr-gramsci-nomi/'
      solrUrl: 'http://193.205.129.92:8080/solr-gramsci-nomi/'
     });

    Manager.addWidget(new AjaxSolr.ResultWidget({
      id: 'result',
      target: '#docs'
    }));

    Manager.addWidget(new AjaxSolr.PagerWidget({
      id: 'pager',
      target: '#pager',
      prevLabel: '&lt;',
      nextLabel: '&gt;',
      innerWindow: 1,
      renderHeader: function (perPage, offset, total) {
        $('#pager-header').html($('<span style="margin:3pt"></span>').text('Stai visualizzando da ' + Math.min(total, offset + 1) + ' a ' + Math.min(total, offset + perPage) + ' di ' + total + ' risultati'));
      }
    }));

    var fields = ['quaderno_struct_ss'];
    var facetsNamesMapping = {'nome_s': 'Nome', 'quaderno_struct_ss': 'Quaderno'};

    for (var i = 0, l = fields.length; i < l; i++) {
      Manager.addWidget(new AjaxSolr.SmallFacetsWidget({
        id: fields[i],
        target: '#' + fields[i],
        field: fields[i]
      }));
    }

    Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
      id: 'currentsearch',
      target: '#selection',
      facetsNamesMapping: facetsNamesMapping
    }));

    Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'nome',
      target: '#nome_search',
      fields: ['nome_s'],
      facetsNamesMapping: facetsNamesMapping,
      submitOnlyIfTermSelect: true,
	  removeCommas: true
    }));

    Manager.addWidget(new AjaxSolr.SortWidget({
      id: 'sort',
      target: '#sort'
    }));

    Manager.init();
    Manager.store.addByValue('q', '*:*');

    var params = {
      facet: true,
      'facet.field': ['nome_s', 'quaderno_ss', 'quaderno_count_ss', 'quaderno_struct_ss'],
      'facet.limit': 100,
      'facet.mincount': 1,
      'sort': 'total_count_i desc',
      'json.nl': 'map',
      'rows': 50
    };

    for (var name in params) {
      Manager.store.addByValue(name, params[name]);
    }

    // Process URI
    Manager.processURI(location, params['facet.field']);


    Manager.doRequest();
  });

  $.fn.showIf = function (condition) {
    if (condition) {
      return this.show();
    }
    else {
      return this.hide();
    }
  }

})(jQuery);

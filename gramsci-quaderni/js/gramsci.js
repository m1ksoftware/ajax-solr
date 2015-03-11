var Manager;

(function ($) {

  $(function () {
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://gramsciproject.org:8080/solr-gramsci-quaderni/'
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

    var fields = ['mention_ss', 'mentions_place_ss', 'mentions_book_ss', 'mentions_language_ss', 'mentions_event_ss', 'mentions_person_ss',  'mentions_type_ss', 'topic_ss'];
    var facetsNamesMapping = {'mention_ss': 'Cita', 'cited_by_ss': 'Voce Dizionario', 'mentions_place_ss': 'Luoghi', 'mentions_book_ss': 'Libri', 'mentions_language_ss': 'Lingue', 'mentions_event_ss': 'Eventi', 'mentions_person_ss': 'Persone', 'annotated_in_ss': 'Annotato con Pundit', 'annotated_by_ss': 'Utenti di Pundit', 'topic_ss': 'Voce Gerratana', 'text': 'Testo della voce'};

    for (var i = 0, l = fields.length; i < l; i++) {
      Manager.addWidget(new AjaxSolr.SmallFacetsWidget({
        id: fields[i],
        target: '#' + fields[i],
        field: fields[i]
      }));
    }

    Manager.addWidget(new AjaxSolr.FacetsWidget({
        id: cited_by_ss,
        target: '#cited_by_ss' ,
        field: 'cited_by_ss'
    }));
    Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
      id: 'currentsearch',
      target: '#selection',
      facetsNamesMapping: facetsNamesMapping
    }));
    Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'text',
      target: '#search',
      fields: [ 'text', 'label_ss'],
      facetsNamesMapping: facetsNamesMapping,
      submitOnlyIfTermSelect: true
    }));
    Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'dic_text',
      target: '#dic_search',
      fields: [ 'cited_by_ss', 'topic_ss'],
      facetsNamesMapping: facetsNamesMapping,
      submitOnlyIfTermSelect: true
    }));
    Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'dbp_text',
      target: '#dbp_search',
      fields: [ 'mentions_person_ss'],
      facetsNamesMapping: facetsNamesMapping,
      submitOnlyIfTermSelect: true
    }));
    Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'event_text',
      target: '#event_search',
      fields: [ 'mentions_event_ss'],
      facetsNamesMapping: facetsNamesMapping,
      submitOnlyIfTermSelect: true
    }));
    Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'book_text',
      target: '#book_search',
      fields: [ 'mentions_book_ss'],
      facetsNamesMapping: facetsNamesMapping,
      submitOnlyIfTermSelect: true
    }));
    Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'place_text',
      target: '#place_search',
      fields: [ 'mentions_place_ss'],
      facetsNamesMapping: facetsNamesMapping,
      submitOnlyIfTermSelect: true
    }));
    Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'language_text',
      target: '#language_search',
      fields: [ 'mentions_language_ss'],
      facetsNamesMapping: facetsNamesMapping,
      submitOnlyIfTermSelect: true
    }));
    Manager.init();
    Manager.store.addByValue('q', '*:*');
    var params = {
      facet: true,
      'facet.field': ['text', 'cited_by_ss', 'mentions_place_ss', 'mentions_book_ss', 'mentions_language_ss', 'mentions_event_ss', 'mentions_person_ss', 'annotated_in_ss', 'annotated_by_ss', 'mentions_type_ss', 'topic_ss'],
      'facet.limit': 1000,
      'facet.mincount': 1,
      'sort': 'quaderno_f asc, nota_i asc',
      'json.nl': 'map'
    };
    for (var name in params) {
      Manager.store.addByValue(name, params[name]);
    }

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
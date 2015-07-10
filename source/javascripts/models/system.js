define([
  'backbone'
],
function(
    Backbone
) {

  var SystemModel = Backbone.Model.extend({

    initialize: function() {
      return this;
    },

    /**
     * Simple setup of many useful config strings
     */
    defaults: {
      Parse: {
        ROOT: 'https://api.parse.com/1',
        API_KEY: 'pPeLQpgxgY9GcPuihyQ1boIH51vod9yK4nMZ1ibA',
        JS_KEY: 'Z4A3F1P8FqI9HHZ87whOhyHny2yKkDo4Xo0GlgzM',
        REST_KEY: 'vRKLltmPuDjdfxFFNs6ZD7iHuG5su0J6nTh0VT36',
        CLASSES: '/classes',
        USER: '/_User',
        USERS: '/users',
        CHAMPIONSHIP: '/Championships',
        CHAMPIONSHIPS: '/Championships',
        CHAMPIONSHIPPLAYERS: '/ChampionshipPlayers'
      }
    },

    /**
     * sets up data for relation creation between two data tables
     * @param  {String} name is the title of the table to reference to
     * @param  {String} id   is the index being pointed to from the other item
     * @return {Object}      complete object for storing a relation
     */
    getParseRef: function(name, id) {
      if (!name || !id) { throw new Error('Name or ID needed!'); }

      return {
        __op: 'AddRelation',
        objects: [{
          __type: 'Pointer',
          className: name,
          objectId: id
        }]
      };
    },

    /**
     * Construct a one to one query for Parse to find related table data
     * @param  {String} name is the title of the table being referenced from
     * @param  {String} type is the title of the table being looked at
     * @param  {String} id   is the index being used to compare the referenced
     * @return {String}      the final query to be appended to any xhr
     */
    getExactRef: function(name, type, id) {
      type = type + 'Ref';
      return '?where={"' + type + '":{"__type":"Pointer","className":"' + name + '","objectId":"' + id + '"}}';
    },

    /**
     * Construct a one to many query for Parse to find related table data
     * @param  {String} name is the title of the table being referenced from
     * @param  {String} type is the title of the table being looked at
     * @param  {String} id   is the index being used to compare the referenced
     * @return {String}      the final query to be appended to any xhr
     */
    getRelatedRef: function(name, type, id) {
      type = type + 'Ref';
      return '?where={"$relatedTo":{"object":{"__type":"Pointer","className":"' + name + '","objectId":"' + id + '"},"key":"' + type + '"}}';
    },

    /**
     * Convert location string into useable JSON
     * @return {Object} a parsed JSON object of query parameters
     */
    parseQuery: function() {
      var s = window.location.search.substring(1);
      return (s.length === 0) ? {} : JSON.parse('{\"' + decodeURI(s).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '\"}');
    }

  });

  return new SystemModel();

});

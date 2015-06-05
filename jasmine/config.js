// Requirejs Configuration Options
require.config({
  // to set the default folder
  baseUrl: './public/js',
  // paths: maps ids with paths (no extension)
  paths: {
      'jasmine': ['../../jasmine/lib/jasmine'],
      'jasmine-html': ['../../jasmine/lib/jasmine-html'],
      'jasmine-boot': ['../../jasmine/lib/boot'],
      "jquery": "libs/jquery",
      "underscore": "libs/underscore",
      "backbone": "libs/backbone",
      'models': 'app/models',
      'testmodels': 'tests/models'
  },
  // shim: makes external libraries compatible with requirejs (AMD)
  shim: {
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    }
  }
});

// Load the specs into view
require(['jasmine-boot'], function () {
  require(['testmodels/HeaderModel'], function(){
    //trigger Jasmine
    window.onload();
  })
});

var fs = require('fs');
var requirejs = require('requirejs');
var jasmine = require('./jasmine/jasmine').jasmine;
var jasmine_console = require('./jasmine/jasmine_console').jasmine_console;

// configure requirejs
requirejs.config({
  nodeRequire: require,
  baseUrl: './tests',
  paths: {
      models: './models'
  }
});

// make define available globally like it is in the browser
global.define = require('requirejs');

// make jasmine available globally like it is in the browser
global.describe = require('./jasmine/jasmine').describe;
global.it = require('./jasmine/jasmine').it;
global.expect = require('./jasmine/jasmine').expect;

// load specs
fs.readdirSync(__dirname + '/tests/models/').map(function(spec) {
    if(spec !== ".DS_Store"){
        spec = spec.replace(".js", "");
        console.log("spec url",__dirname + '/tests/models/' + spec);
        requirejs(['models/' + spec],function(specs){
            console.log("spec file",spec);
        });
    }
});

// run em
jasmine.getEnv().addReporter(new jasmine_console());
jasmine.getEnv().execute();

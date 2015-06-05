var fs = require('fs');
var requirejs = require('requirejs');
var jasmine = require('./jasmine/jasmine').jasmine;
var jasmine_console = require('./jasmine/jasmine_console').jasmine_console;
var masterUrl = __dirname + '/public/js/tests/models/';

// configure requirejs
requirejs.config({
    nodeRequire: require,
    baseUrl: './public/js',
    paths: {
        jasmine: ['../../jasmine/lib/jasmine'],
        'jasmine-html': ['../../jasmine/lib/jasmine-html'],
        'jasmine-boot': ['../../jasmine/lib/boot'],
        "jquery": "libs/jquery",
        "underscore": "libs/underscore",
        "backbone": "libs/backbone",
        models: 'app/models',
        testmodels: 'tests/models'
    }
});

// make define available globally like it is in the browser
global.define = require('requirejs');

// make jasmine available globally like it is in the browser
global.describe     = require('./jasmine/jasmine').describe;
global.it           = require('./jasmine/jasmine').it;
global.expect       = require('./jasmine/jasmine').expect;

// load specs
fs.readdirSync( masterUrl ).map(function(spec) {
    if(spec !== ".DS_Store"){
        console.log("spec url",masterUrl + spec, spec);
        spec = spec.replace(".js", "");
        requirejs(['models/' + spec, 'testmodels/' + spec],function(specs){
            console.log("spec file",spec);
        });
    }
});

// run em
jasmine.getEnv().addReporter(new jasmine_console());
jasmine.getEnv().execute();

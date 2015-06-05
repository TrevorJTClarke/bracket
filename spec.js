var fs = require('fs');
var requirejs = require('requirejs');
var jasbase = require('./jasmine/lib/jasmine');
var jasmine_console = require('./jasmine/lib/console').jasmine_console;
var masterUrl = __dirname + '/public/js/tests/models/';

// configure requirejs
requirejs.config({
    nodeRequire: require,
    baseUrl: './public/js',
    paths: {
        'jasmine': ['../../jasmine/lib/jasmine'],
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
var jasmine         = jasbase.jasmine;
global.describe     = jasbase.describe;
global.it           = jasbase.it;
global.expect       = jasbase.expect;

// load specs
fs.readdirSync( masterUrl ).map(function(spec) {
    if(spec !== ".DS_Store"){
        spec = spec.replace(".js", "");
        console.log("spec url",masterUrl + spec);
        requirejs(['models/' + spec],function(specs){
            console.log("spec file",spec);
        });
    }
});

// run em
jasmine.getEnv().addReporter(new jasmine_console());
jasmine.getEnv().execute();

define(['Handlebars'],function(Handlebars){this["bracket"] = this["bracket"] || {};
this["bracket"]["championshipItems"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li data-navigate=\"/"
    + alias3(((helper = (helper = helpers.objectId || (depth0 != null ? depth0.objectId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"objectId","hash":{},"data":data}) : helper)))
    + "\" class=\"match-item "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n  <div class=\"m-title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n  <div class=\"m-subtitle\"><span class=\"label"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.status : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + alias3(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"status","hash":{},"data":data}) : helper)))
    + "</span> "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.updatedAt : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n  <i class=\"glyphicon glyphicon-chevron-right\"></i>\n</li>\n";
},"2":function(depth0,helpers,partials,data) {
    return "active";
},"4":function(depth0,helpers,partials,data) {
    return " label-"
    + this.escapeExpression((helpers.gameStatus || (depth0 && depth0.gameStatus) || helpers.helperMissing).call(depth0,depth0,{"name":"gameStatus","hash":{},"data":data}));
},"6":function(depth0,helpers,partials,data) {
    return this.escapeExpression((helpers.timeago || (depth0 && depth0.timeago) || helpers.helperMissing).call(depth0,depth0,{"name":"timeago","hash":{},"data":data}));
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.games : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["bracket"]["createChampionship"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div id=\"sectionFirst\" class=\"row\">\n  <div class=\"col-md-6 col-md-offset-3\">\n    <h3>New Championship</h3>\n    <div class=\"form-group\">\n      <input type=\"text\" id=\"chTitle\" placeholder=\"Title\">\n    </div>\n    <button id=\"newChampionship\" class=\"btn btn-default btn-fixed-bottom\">Next</button>\n  </div>\n</div>\n<div id=\"sectionSecond\" class=\"row\">\n  <div class=\"col-md-6 col-md-offset-3\">\n    <h3>Add Players</h3>\n    <div class=\"create-players\">\n      "
    + ((stack1 = ((helper = (helper = helpers.playerListTpl || (depth0 != null ? depth0.playerListTpl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"playerListTpl","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n    <button id=\"doneAddingPlayers\" class=\"btn btn-default btn-fixed-bottom\">Done</button>\n  </div>\n</div>\n\n<div class=\"footer-pad\"></div>\n";
},"useData":true});
this["bracket"]["game"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"game-editor\"></div>\n<div class=\"game-container\"></div>\n";
},"useData":true});
this["bracket"]["gameEditor"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "  <div class=\"game-player\" data-drag=\""
    + alias3(((helper = (helper = helpers.objectId || (depth0 != null ? depth0.objectId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"objectId","hash":{},"data":data}) : helper)))
    + "\" draggable=\"true\">\n    <div class=\"avatar\" style=\"background:#"
    + alias3(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\">"
    + alias3((helpers.initialz || (depth0 && depth0.initialz) || alias1).call(depth0,depth0,{"name":"initialz","hash":{},"data":data}))
    + "</div>\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"edit-players\">\n  <div id=\"randomize\" class=\"game-player\">\n    <div class=\"avatar randomize\">\n      <i class=\"glyphicon glyphicon-random\"></i>\n    </div>\n  </div>\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<button id=\"doneEditingPlayers\" class=\"btn btn-default btn-fixed-bottom\">Finish</button>\n";
},"useData":true});
this["bracket"]["gameEditorPlayer"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"game-player\" data-drag=\""
    + alias3(((helper = (helper = helpers.objectId || (depth0 != null ? depth0.objectId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"objectId","hash":{},"data":data}) : helper)))
    + "\" draggable=\"true\">\n  <div class=\"avatar\" style=\"background:#"
    + alias3(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\">"
    + alias3(((helper = (helper = helpers.initials || (depth0 != null ? depth0.initials : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"initials","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.editPlayers : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["bracket"]["header"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "show";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<header>\n  <nav class=\"navbar navbar-fixed-top\">\n    <div class=\"profile "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.firstName : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n      <div class=\"avatar\" style=\"background:#"
    + alias3(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\">"
    + alias3(((helper = (helper = helpers.initials || (depth0 != null ? depth0.initials : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"initials","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n    <div class=\"logo\">\n      <svg version=\"1.1\" id=\"BracketLogo\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"100%\" height=\"100%\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 128 128;\" xml:space=\"preserve\">\n        <path style=\"fill:none;\" d=\"M130.031,75h-27.715C97.345,75,93,70.747,93,65.776V42H69.374c-0.579,12-0.492,33.457,6.308,57.606 c11.542,40.988,36.705,70.444,74.879,87.59c-1.728-4.99-3.358-10.03-4.889-15.421C137.924,144.482,132.685,112,130.031,75z\"/>\n        <polygon style=\"fill:none;\" points=\"271.916,107.375 254.95,73.001 237.987,107.375 200.052,112.893 227.498,139.647 221.02,177.43 254.95,159.589 288.881,177.429 282.399,139.647 309.849,112.893 	\"/>\n        <path style=\"fill:none;\" d=\"M417,42v23.776c0,4.971-4.446,9.224-9.417,9.224h-25.602c-2.683,38-8.026,70.573-15.97,98.119 c-1.55,5.373-3.199,10.488-4.948,15.457c38.335-17.2,62.922-47.113,73.168-88.733C440.252,75.386,439.537,53,438.565,42H417z\"/>\n        <path style=\"fill:#F4F4F4;\" d=\"M455.421,31.611c-0.748-4.312-4.49-7.611-8.867-7.611h-38.971c-4.971,0-8.583,4.33-8.583,9.301V57 h-15.961C383.676,43,384,29.155,384,14.5V10H128v4.5c0,14.653,0.327,28.5,0.968,42.5H111V33.301c0-4.971-3.713-9.301-8.684-9.301 H61.097c-4.486,0-8.287,3.454-8.912,7.896c-0.192,1.364-4.582,33.914,5.986,72.002c9.868,35.563,35.088,82.755,99.203,105.436 c0.771,0.272,1.553,0.45,2.33,0.508c16.34,34.665,38.908,56.435,67.375,64.902L215.366,381H181v39h-27.28l-14.509,86h231.477 l-14.507-86H327v-39h-32.468l-11.658-105.65c29.164-7.931,52.256-29.521,68.95-64.371c0.925-0.023,1.86-0.183,2.78-0.508 c64.245-22.727,88.267-70.373,97.104-106.278C461.159,65.806,455.66,32.986,455.421,31.611z M75.682,99.606 C68.882,75.457,68.794,54,69.374,42H93v23.776C93,70.747,97.345,75,102.316,75h27.715c2.653,37,7.893,69.52,15.641,96.813 c1.53,5.391,3.161,10.45,4.889,15.439C112.387,170.106,87.223,140.594,75.682,99.606z M288.881,177.429l-33.931-17.84l-33.93,17.84 l6.478-37.782l-27.446-26.754l37.936-5.518l16.963-34.374l16.966,34.374l37.933,5.518l-27.449,26.755L288.881,177.429z M434.231,99.814c-10.246,41.62-34.833,71.43-73.168,88.63c1.749-4.969,3.398-9.99,4.948-15.363 C373.955,145.536,379.299,113,381.981,75h25.602c4.971,0,9.417-4.253,9.417-9.224V42h21.565 C439.537,53,440.252,75.358,434.231,99.814z\"/>\n      </svg>\n    </div>\n    <div class=\"nav-action "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.firstName : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n      <button class=\"btn btn-action\">\n        <i class=\"glyphicon glyphicon-log-in\"></i>\n      </button>\n    </div>\n  </nav>\n</header>\n";
},"useData":true});
this["bracket"]["loginSignup"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"row ls-tabs\">\n  <div class=\"col-md-6 col-md-offset-3\">\n    <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n      <button type=\"button\" id=\"tabLogin\" class=\"btn btn-tabs\">Login</button>\n      <button type=\"button\" id=\"tabSignup\" class=\"btn btn-tabs\">Sign Up</button>\n    </div>\n  </div>\n</div>\n\n<div id=\"loginSection\" class=\"row ls-section\">\n  <div class=\"col-md-6 col-md-offset-3\">\n    <form id=\"loginForm\">\n      <div class=\"form-group email\">\n        <input type=\"email\" name=\"email\" placeholder=\"Email\" required>\n      </div>\n      <div class=\"form-group password\">\n        <input type=\"password\" name=\"password\" placeholder=\"Password\" required>\n      </div>\n      <button id=\"loginSubmit\" type=\"submit\" class=\"btn btn-default btn-fixed-bottom\">Login</button>\n    </form>\n  </div>\n</div>\n<div id=\"signupSection\" class=\"row ls-section\">\n  <div class=\"col-md-6 col-md-offset-3\">\n    <form id=\"signupForm\">\n      <div class=\"form-group firstName\">\n        <input type=\"text\" name=\"firstName\" placeholder=\"First Name\" required>\n      </div>\n      <div class=\"form-group lastName\">\n        <input type=\"text\" name=\"lastName\" placeholder=\"Last Name\" required>\n      </div>\n      <div class=\"form-group emailSignup\">\n        <input type=\"email\" name=\"email\" placeholder=\"Email\" required>\n      </div>\n      <div class=\"form-group passwordSignup\">\n        <input type=\"password\" name=\"password\" placeholder=\"Password\" required>\n      </div>\n      <div class=\"form-group color\">\n        <input type=\"color\" value=\"#2FAB70\" name=\"color\" pattern=\"^#([A-Fa-f0-9]{6})$\" required title=\"Hexadecimal value required\">\n      </div>\n      <button id=\"signupSubmit\" type=\"submit\" class=\"btn btn-default btn-fixed-bottom\">Create Account</button>\n    </form>\n  </div>\n</div>\n";
},"useData":true});
this["bracket"]["mainIndex"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"row profile\">\n  <div class=\"col-md-6 col-md-offset-3\">\n    <div class=\"profile-meta\">\n      <h3>"
    + alias3(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"firstName","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "</h3>\n      <span>"
    + alias3(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"email","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-6 col-md-offset-3 stats-row\">\n    <div class=\"stats-score\">\n      <div class=\"score-num\">"
    + alias3(((helper = (helper = helpers.win || (depth0 != null ? depth0.win : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"win","hash":{},"data":data}) : helper)))
    + "</div>\n      <div class=\"score-title\">Win</div>\n    </div>\n    <div class=\"stats-score loss\">\n      <div class=\"score-num\">"
    + alias3(((helper = (helper = helpers.loss || (depth0 != null ? depth0.loss : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"loss","hash":{},"data":data}) : helper)))
    + "</div>\n      <div class=\"score-title\">Loss</div>\n    </div>\n    <div class=\"stats-score tie\">\n      <div class=\"score-num\">"
    + alias3(((helper = (helper = helpers.tie || (depth0 != null ? depth0.tie : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tie","hash":{},"data":data}) : helper)))
    + "</div>\n      <div class=\"score-title\">Tie</div>\n    </div>\n  </div>\n</div>\n<hr>\n<div class=\"row matches\">\n  <div class=\"col-md-6 col-md-offset-3\">\n    <h3>Championships</h3>\n    <button id=\"newChampionship\" class=\"btn btn-outline btn-create\">New Championship</button>\n    <ul class=\"profile-matches\">\n      "
    + ((stack1 = ((helper = (helper = helpers.gamesTpl || (depth0 != null ? depth0.gamesTpl : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"gamesTpl","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </ul>\n  </div>\n</div>\n";
},"useData":true});
this["bracket"]["notifier"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"notify-title\">"
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"useData":true});
this["bracket"]["overlay"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"overlay-bold\"></div>\n<div class=\"overlay-lite\"></div>\n";
},"useData":true});
this["bracket"]["playerListingItem"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"player\">\n  <div class=\"avatar\" style=\"background:#"
    + alias3(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\">"
    + alias3(((helper = (helper = helpers.initials || (depth0 != null ? depth0.initials : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"initials","hash":{},"data":data}) : helper)))
    + "</div>\n  <div class=\"player-meta\">\n    <h5 class=\"player-name\">"
    + alias3(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"firstName","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "</h5>\n    <span class=\"player-email\">"
    + alias3(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"email","hash":{},"data":data}) : helper)))
    + "</span>\n    <button id=\"player_"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-circle player-action "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.added : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.admin : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n      <i class=\"glyphicon glyphicon glyphicon-ok\"></i>\n    </button>\n  </div>\n</div>\n";
},"2":function(depth0,helpers,partials,data) {
    return "active";
},"4":function(depth0,helpers,partials,data) {
    return "admin";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.players : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["bracket"]["scoreboard"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"row\">\n  <div class=\"score-panel\">\n    <div class=\"panel-item\" style=\"background: #0076AE;\">\n      <div class=\"score-total\">7</div>\n      <div class=\"score-user\">mdeol</div>\n    </div>\n    <div class=\"panel-item\" style=\"background: #2fab70;\">\n      <div class=\"score-total\">12</div>\n      <div class=\"score-user\">tclarke</div>\n    </div>\n  </div>\n</div>\n<div class=\"score-actions\">\n  <button id=\"score_0\" class=\"btn btn-score\">+</button>\n  <button id=\"score_1\" class=\"btn btn-score\">+</button>\n</div>\n<div class=\"scoreboard-footer\">\n  <div class=\"score-timer\">\n    <i class=\"glyphicon glyphicon-time\"></i> <span>3:24 mins</span>\n  </div>\n  <button class=\"btn btn-rematch\">\n    <i class=\"glyphicon glyphicon-repeat\"></i> <span>Re-match</span>\n  </button>\n</div>\n";
},"useData":true});
this["bracket"]["tiersContainer"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.matches : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.spacers : depth0),{"name":"if","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "    <ul class=\"round\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.matches : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "      <li class=\"spacer\">&nbsp;</li>\n    </ul>\n";
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "      <li class=\"spacer\">&nbsp;</li>\n      <li class=\"match"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.winner : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\""
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.sort : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n        <div class=\"match-tag\"><span>"
    + this.escapeExpression(((helper = (helper = helpers.sort || (depth0 != null ? depth0.sort : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"sort","hash":{},"data":data}) : helper)))
    + "</span></div>\n"
    + ((stack1 = (helpers.matchPlayer || (depth0 && depth0.matchPlayer) || alias1).call(depth0,(depth0 != null ? depth0.players : depth0),{"name":"matchPlayer","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "      </li>\n";
},"5":function(depth0,helpers,partials,data) {
    return " active";
},"7":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return " data-navigate=\""
    + alias3(((helper = (helper = helpers.parentTier || (depth0 != null ? depth0.parentTier : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentTier","hash":{},"data":data}) : helper)))
    + "_"
    + alias3(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\"";
},"9":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.firstName : depth0),{"name":"if","hash":{},"fn":this.program(10, data, 0),"inverse":this.program(12, data, 0),"data":data})) != null ? stack1 : "");
},"10":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "          <div class=\"avatar\" style=\"background:#"
    + alias2(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\">"
    + alias2((helpers.initialz || (depth0 && depth0.initialz) || alias1).call(depth0,depth0,{"name":"initialz","hash":{},"data":data}))
    + "</div>\n";
},"12":function(depth0,helpers,partials,data) {
    return "          <div class=\"avatar empty\"></div>\n";
},"14":function(depth0,helpers,partials,data) {
    var stack1;

  return "    <ul class=\"round-spacers\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.spacers : depth0),{"name":"each","hash":{},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <li class=\"line-spacer\"></li>\n    </ul>\n";
},"15":function(depth0,helpers,partials,data) {
    return "      <li class=\"line-spacer\"></li>\n      <li class=\"line-spacer\"></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.tiersFlow || (depth0 && depth0.tiersFlow) || helpers.helperMissing).call(depth0,depth0,{"name":"tiersFlow","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});});
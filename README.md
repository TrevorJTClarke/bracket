# bracket
A quick setup of bracket championships.

###Start

Get bracket running:

  * Enter `gulp serve` in command line, and you should see your default browser load the site. It is set to reload automatically upon file changes.
  
### Required Things:

  * [Phantomjs](http://phantomjs.org/)
  * [CasperJs](http://casperjs.org/)
  * [Gulp](http://gulpjs.com/)
    
###Unit Testing

##### Jasmine

Used for code based testing, [jasmine](http://jasmine.github.io/2.0/introduction.html) is a helpful tool for code coverage. All unit tests are written for jasmine and requirejs.

##### Backstop

Make visual changes, and let [backstop](https://github.com/garris/BackstopJS) do the QA work!

To run these tests, you will need to navigate to the `./node_modules/backstopjs` folder, the first run `gulp reference`. Once changes have been made, run `gulp test`, and backstop will handle the screencaptures and diffs. Backstop will also automatically launch a new browser tab, and show you the diffs with a pass/fail list. 



### Project Development

`npm install --save dev` - This will install all the local node_modules needed.

`gulp serve` - This will run the compiler, so as files change they get auto-compiled.

`karma start` - You will need [karma](http://karma-runner.github.io/0.12/intro/installation.html) installed. This will run all tests inside a new tab, and report inside the CLI.


#### Notes:

All working source files are in the `public` folder.

All distribution files are in the `dist` folder.

If node is not installed, please do so before running npm commands.
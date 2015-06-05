# bracket
A quick setup of bracket championships.

###Start

Get bracket running:

  * Enter `gulp serve` in command line, and you should see your default browser load the site. It is set to reload automatically upon file changes.
    


### Project Development

`npm install --save dev` - This will install all the local node_modules needed.

`gulp serve` - This will run the compiler, so as files change they get auto-compiled.

`karma start` - You will need [karma](http://karma-runner.github.io/0.12/intro/installation.html) installed. This will run all tests inside a new tab, and report inside the CLI.


#### Notes:

All working source files are in the `public` folder.

All distribution files are in the `dist` folder.

If node is not installed, please do so before running npm commands.
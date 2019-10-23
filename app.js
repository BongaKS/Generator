// This generator will create any kind of config file were just using ngix as an example.

// Set up dependencies

var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var YAML = require('js-yaml');
var nunjucks = require('nunjucks');
var nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'), { autoescape: false });
var templateDir = path.join(__dirname, './templates');
var outputDir = path.join(__dirname, './output');

/* Check to see if the  output folders exist and create them if they don't. */

function createFolders () {
  let folders = YAML.safeLoad(fs.readFileSync(path.join(__dirname, 'values.yml'), 'utf8'));
  var length = folders.labs.length;
  for (var i = 0; i < length; i++) {
    var foldername = folders.labs[i].name;
    var folderexist = fs.existsSync(path.join(outputDir, foldername));
    var directory = path.join(outputDir, foldername);
    if (folderexist === false) {
      fs.mkdir(directory);
      renderTemplate(directory);
    } else {
      console.log('The directory ' + directory + ' already exists');
      renderTemplate(directory);
    }
  }
}

/* Function that creates the template */

function renderTemplate (outputDir) {
  let Templatefile = fs.readFileSync(path.join(templateDir, 'main.rb.j2'), 'utf8');
  let values = YAML.safeLoad(fs.readFileSync(path.join(__dirname, 'values.yml'), 'utf8'));
  let outputFile = path.join(outputDir, 'main.tf');
  let nujucksOutput = nunjucksEnv.renderString(Templatefile, values);
  fs.writeFileSync(outputFile, nujucksOutput);
}

createFolders();

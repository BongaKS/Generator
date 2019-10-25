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
  let folders = YAML.safeLoad(fs.readFileSync(path.join(__dirname, 'sites.yml'), 'utf8'));
  var length = folders.sites.length;
  for (var i = 0; i < length; i++) {
    var foldername = folders.sites[i].name;
    var folderexist = fs.existsSync(path.join(outputDir, foldername));
    var directory = path.join(outputDir, foldername);
    var fileNameOut = folders.sites[i].name + folders.sites[i].extention;
    if (folderexist === false) {
      fs.mkdir(directory, { recursive: true }, (err) => {
        if (err) throw err;
      });
    } else {
      console.log('The directory ' + directory + ' already exists');
      renderTemplate(directory);
    }
    renderTemplate(directory, fileNameOut);
  }
}

/* Function that creates the template */

function renderTemplate (outputDir, fileNameOut) {
  let Templatefile = fs.readFileSync(path.join(templateDir, 'nginx.rb.j2'), 'utf8');
  let values = YAML.safeLoad(fs.readFileSync(path.join(__dirname, 'values.yml'), 'utf8'));
  let outputFile = path.join(outputDir, fileNameOut);
  let nujucksOutput = nunjucksEnv.renderString(Templatefile, values);
  fs.writeFileSync(outputFile, nujucksOutput);
}

createFolders();

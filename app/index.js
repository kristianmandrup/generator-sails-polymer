var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var SailsPolymerGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the marvelous SailsPolymer generator!'
    ));

    var prompts = [
      {
        name: 'appName',
        message: 'App name:'
      },
      {
        name: 'version',
        message: 'App version:',
        default: '0.0.1'
      },
      {
        name: 'elementPrefix',
        message: 'Element prefix:',
        default: 'app'
      }
    ];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.version = props.version;
      this.elementPrefix = props.elementPrefix;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.mkdir('api');
      this.mkdir('api/controllers');
      this.mkdir('api/services');
      this.mkdir('api/models');

      this.directory('config');
      this.directory('test');
      this.directory('public');

      this.src.copy('_Gruntfile.js', 'Gruntfile.js');
      this.src.copy('_app.js', 'app.js');

      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');

      var self = this;
      function copyElement (elementName) {
        var elementNameWithPrefix = self.elementPrefix + '-' + elementName;
        var srcDir = 'elements/' + elementName + '/';
        var targetDir = 'public/elements/' + elementNameWithPrefix + '/';

        self.template(srcDir + elementName + '.css', targetDir + elementNameWithPrefix + '.css');
        self.template(srcDir + elementName + '.html', targetDir + elementNameWithPrefix + '.html');
      }

      copyElement('logo');
      copyElement('main');

      this.template('views/_index.html', 'views/index.html');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('bowerrc', '.bowerrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = SailsPolymerGenerator;

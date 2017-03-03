var yeoman = require('yeoman-generator');
var yosay = require('yosay');

function has(list, item) {
  return list.indexOf(item) >= 0;
}

var SailsPolymerGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  chosenAdapter: (adapter) {
    return has(this.waterlineORMs, adapter);
  },

  adapters: ['disk', 'memory', 'mongo', 'mysql', 'postgres', 'redis'],

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the marvelous SailsPolymer generator!'
    ));

    var prompts = [
      {
        name: 'appName',
        type: 'input',
        message: 'App name:',
        default: 'my-sails-app'
      },
      {
        name: 'version',
        type: 'input',
        message: 'App version:',
        default: '0.0.1'
      },
      {
        name: 'includeSPA',
        type: 'confirm',
        message: 'Include Polymer SPA',
        default: true
      },
      {
        name: 'waterlineORMs',
        type: 'choice',
        message: 'Select waterline ORMs',
        choices: this.adapters,
        default: ['disk', 'mongo']
      },
      {
        name: 'dbName',
        type: 'input',
        message: 'Main database name',
        default: 'my-db'
      },
      {
        name: 'includeSwagger',
        type: 'confirm',
        message: 'Include setup for Swagger documentation:',
        default: true
      }
    ];

    this.prompt(prompts).then(props) {
      this.appName = props.appName;
      this.version = props.version;
      this.elementPrefix = props.elementPrefix;
      this.includeSwagger = props.includeSwagger;
      this.waterlineORMs = waterlineORMs;

      for (let adapter of this.adapters) {
        this[adapter] = chosenAdapter(adapter);
      }
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

      if (this.includeSwagger) {
        this.directory('swagger', 'public/swagger');
        this.template('_swaggerindex.html', 'public/swagger/index.html');
      }

      this.src.copy('_Gruntfile.js', 'Gruntfile.js');
      this.src.copy('_app.js', 'app.js');

      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_http.js', 'config/http.js');
      this.template('_routes.js', 'config/routes.js');

      if (this.includeSPA) {
        this.src.copy('_views.js', 'config/views.js');
        this.template('views/_index.html', 'views/index.html');
      }
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

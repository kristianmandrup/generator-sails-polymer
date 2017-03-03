const Generator = require('yeoman-generator');
const yosay = require('yosay');
const S = require('string')

const adapters = require('./adapters')
const createPrompts = require('./prompts')

function has (list, item) {
  return list.indexOf(item) >= 0;
}

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor (args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('spa'); // This method adds support for a `--babel` flag
    this.option('swagger');
  }

  chosenAdapter (adapter) {
    return has(this.props.waterlineORMs, adapter);
  }

  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the marvelous SailsPolymer generator!'
    ));

    const prompts = createPrompts(this)
    console.log('prompts', prompts)

    return this.prompt(prompts).then(props => {
      console.log('answers', props)

      this.props = props;
      this.props.appNameDash = S(this.props.appName).dasherize().s

      for (let adapter of adapters) {
        this.props[adapter] = this.chosenAdapter(adapter);
      }
    });
  }

  _template (src, dest, props) {
    console.log('template', src, dest, props)

    props = props || this.props || {}
    const srcPath = this.templatePath(src)
    const destPath = this.destinationPath(dest)

    this.fs.copyTpl(
      srcPath,
      destPath,
      props
    );
  }

  _copy (src, dest, props) {
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    );
  }

  _appFiles () {
    console.log('writing app files')

    if (this.includeSwagger) {
      // this.directory('swagger', 'public/swagger');
      this._template('_swaggerindex.html', 'public/swagger/index.html');
    }

    this._copy('_Gruntfile.js', 'Gruntfile.js');
    this._copy('_app.js', 'app.js');

    this._template('_package.json', 'package.json');
    this._template('_bower.json', 'bower.json');
    this._template('_http.js', 'config/http.js');
    this._template('_routes.js', 'config/routes.js');

    if (this.includeSPA) {
      this._copy('_views.js', 'config/views.js');
      this._template('views/_index.html', 'views/index.html');
    }
  }

  _projFiles () {
    console.log('writing project files')    
    // project files
    this._copy('editorconfig', '.editorconfig');
    this._copy('jshintrc', '.jshintrc');
    this._copy('gitignore', '.gitignore');
    this._copy('bowerrc', '.bowerrc');
  }

  writing () {
    this._appFiles()
    this._projFiles()
  }

  end () {
    this.installDependencies();
  }
}

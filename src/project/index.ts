import Generator from 'yeoman-generator';

interface Options {
  projectName: string;
}

export = class ProjectGenerator extends Generator {
  public options: Options;

  constructor(args: string | string[], options: Options) {
    super(args, options);
    this.options = options;

    this.option('projectName', {
      description: 'Project Name: ',
      type: String,
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('buildspec.yml'),
      this.destinationPath('buildspec.yml'),
      this.options,
    );
  }
};

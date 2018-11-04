import Generator from 'yeoman-generator';

import createCloudFormationTemplate from '../lib/createCloudFormationTemplate';

interface Options {
  projectName: string;
}

export = class CloudFormationGenerator extends Generator {
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
    this.fs.writeJSON(
      this.destinationPath('conf/template.json'),
      createCloudFormationTemplate(this.options.projectName),
    );
  }
};

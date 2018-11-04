import Generator from 'yeoman-generator';

import createCloudFormationTemplate from '../lib/createCloudFormationTemplate';
import { OutputFormat } from '../lib/formatOutput';

interface Options {
  format: OutputFormat;
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
    this.option('format', {
      default: 'json',
      description: 'JSON or YML',
      type: String,
    });
  }

  writing() {
    const extension = this.options.format;

    this.fs.writeJSON(
      this.destinationPath(`conf/template.${extension}`),
      createCloudFormationTemplate(
        this.options.projectName,
        this.options.format,
      ),
    );
  }
};

import Generator from 'yeoman-generator';

import createCloudFormationTemplate from '../lib/createCloudFormationTemplate';
import { OutputFormat } from '../lib/formatOutput';

interface Options {
  format: OutputFormat;
  repoSlug: string;
}

export = class CloudFormationGenerator extends Generator {
  public options: Options;

  constructor(args: string | string[], options: Options) {
    super(args, options);
    this.options = options;

    this.option('format', {
      default: 'json',
      description: 'JSON or YML',
      type: String,
    });
    this.option('repoSlug', {
      description:
        'GitHub repo slug: (e.g. EndemolShineGroup/generator-codebuild) ',
      type: String,
    });
  }

  writing() {
    const extension = this.options.format;

    this.fs.write(
      this.destinationPath(`conf/template.${extension}`),
      createCloudFormationTemplate(this.options.repoSlug, this.options.format),
    );
  }
};

import path from 'path';
import Generator from 'yeoman-generator';

import prompts from './prompts';

export default class NodeJsTypeScriptGenerator extends Generator {
  public answers: Generator.Answers = {};

  constructor(args: string | string[], opts: {}) {
    super(args, opts);
    this.sourceRoot(path.join(__dirname, 'templates'));
  }

  async initializing() {
    this.log('A few questions about your project...');
  }

  async prompting() {
    this.answers = await this.prompt(prompts);

    this.composeWith(require.resolve('../cloudformation'), this.answers);
    this.composeWith(require.resolve('../project'), this.answers);
  }
}

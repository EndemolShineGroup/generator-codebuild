import Generator from 'yeoman-generator';

import prompts from './prompts';

export default class CodeBuildGenerator extends Generator {
  async initializing() {
    this.log('A few questions about your project...');
  }

  async prompting() {
    const answers = await this.prompt(prompts);

    this.composeWith(require.resolve('../cloudformation'), answers);
    this.composeWith(require.resolve('../project'), answers);
  }
}

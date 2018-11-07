import Generator from 'yeoman-generator';

import filterAndTrim from '../lib/filterAndTrim';
import validateRepoSlug from '../lib/validateRepoSlug';

const prompts: Generator.Questions = [
  {
    filter: filterAndTrim,
    message: 'GitHub repo slug: (e.g. EndemolShineGroup/generator-codebuild)',
    name: 'repoSlug',
    type: 'input',
    validate: validateRepoSlug,
  },
  {
    choices: ['json', 'yml'],
    default: 'yml',
    message: 'CloudFormation template format',
    name: 'format',
    type: 'list',
  },
];

export default prompts;

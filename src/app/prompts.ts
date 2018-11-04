import Generator from 'yeoman-generator';

import filterAndTrim from '../lib/filterAndTrim';

const prompts: Generator.Questions = [
  {
    filter: filterAndTrim,
    message: 'Project Name: ',
    name: 'projectName',
    type: 'input',
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

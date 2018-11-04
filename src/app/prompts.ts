import Generator from 'yeoman-generator';

import filterAndTrim from '../lib/filterAndTrim';

const prompts: Generator.Questions = [
  {
    filter: filterAndTrim,
    message: 'Project Name: ',
    name: 'projectName',
    type: 'input',
  },
];

export default prompts;

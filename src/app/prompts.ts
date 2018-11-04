import Generator from 'yeoman-generator';

import filterAndTrim from '@endemolshinegroup/generator-nodejs-ts/generators/lib/filterAndTrim';

const prompts: Generator.Questions = [
  {
    filter: filterAndTrim,
    message: 'Project Name: ',
    name: 'projectName',
    type: 'input',
  },
];

export default prompts;

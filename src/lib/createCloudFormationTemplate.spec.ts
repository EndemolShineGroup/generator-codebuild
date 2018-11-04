import yaml from 'js-yaml';

import createCloudFormationTemplate from './createCloudFormationTemplate';

describe('#createCloudFormationTemplate', () => {
  const PROJECT_NAME = 'glasf-bist';

  it('generates a valid CloudFormation template in JSON', () => {
    const result = JSON.parse(createCloudFormationTemplate(PROJECT_NAME));

    expect(result).toHaveProperty('Resources');
    expect(JSON.stringify(result.Resources.CodeBuildIamPolicy)).toMatch(
      new RegExp(PROJECT_NAME, 'g'),
    );
    expect(result.Resources.CodeBuildProject.Properties.Name).toEqual(
      PROJECT_NAME,
    );
  });

  it('generates a valid CloudFormation template in YML', () => {
    const result = yaml.safeLoad(
      createCloudFormationTemplate(PROJECT_NAME, 'yml'),
    );

    expect(result).toHaveProperty('Resources');
    expect(JSON.stringify(result.Resources.CodeBuildIamPolicy)).toMatch(
      new RegExp(PROJECT_NAME, 'g'),
    );
    expect(result.Resources.CodeBuildProject.Properties.Name).toEqual(
      PROJECT_NAME,
    );
  });
});

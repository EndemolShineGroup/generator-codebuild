import yaml from 'js-yaml';

import createCloudFormationTemplate from './createCloudFormationTemplate';

describe('#createCloudFormationTemplate', () => {
  const PROJECT_NAME = 'glasf-bist';
  const REPO_SLUG = `EndemolShineGroup/${PROJECT_NAME}`;

  it('generates a valid CloudFormation template in JSON', () => {
    const result = JSON.parse(createCloudFormationTemplate(REPO_SLUG));

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
      createCloudFormationTemplate(REPO_SLUG, 'yml'),
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

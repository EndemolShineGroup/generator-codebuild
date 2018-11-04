import createCloudFormationTemplate from './createCloudFormationTemplate';

describe('#createCloudFormationTemplate', () => {
  const PROJECT_NAME = 'glasf-bist';

  it('generates a valid CloudFormation template', () => {
    const result = createCloudFormationTemplate(PROJECT_NAME, false);

    expect(result).toHaveProperty('Resources');
    expect(JSON.stringify(result.Resources.CodeBuildIamPolicy)).toMatch(
      new RegExp(PROJECT_NAME, 'g'),
    );
    expect(result.Resources.CodeBuildProject.Properties.Name).toEqual(
      PROJECT_NAME,
    );
  });
});

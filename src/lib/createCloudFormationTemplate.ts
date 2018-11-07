import cloudform, { CodeBuild, Fn, IAM, Refs } from 'cloudform';

import formatOutput, { OutputFormat } from './formatOutput';

export const generateIamRole = () => {
  // tslint:disable:object-literal-sort-keys
  return new IAM.Role({
    RoleName: 'CodeBuildServiceRole',
    AssumeRolePolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            Service: 'codebuild.amazonaws.com',
          },
          Action: 'sts:AssumeRole',
        },
      ],
    },
  });
  // tslint:enable:object-literal-sort-keys
};

export const generateIamPolicy = (projectName: string) => {
  // tslint:disable:object-literal-sort-keys
  return new IAM.Policy({
    PolicyName: 'CodeBuildServicePolicy',
    PolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Resource: [
            Fn.Join(':', [
              'arn:aws:logs',
              Refs.Region,
              Refs.AccountId,
              'log-group',
              `/aws/codebuild/${projectName}`,
            ]),
            Fn.Join(':', [
              'arn:aws:logs',
              Refs.Region,
              Refs.AccountId,
              'log-group',
              `/aws/codebuild/${projectName}`,
              '*',
            ]),
          ],
          Action: [
            'logs:CreateLogGroup',
            'logs:CreateLogStream',
            'logs:PutLogEvents',
          ],
        },
      ],
    },
    Roles: [Fn.Ref('CodeBuildIamRole')],
  }).dependsOn('CodeBuildIamRole');
  // tslint:enable:object-literal-sort-keys
};

export const generateCodeBuildProject = (
  projectName: string,
  repoSlug: string,
) => {
  return new CodeBuild.Project({
    Artifacts: {
      Type: 'NO_ARTIFACTS',
    },
    Cache: {
      Type: 'NO_CACHE',
    },
    Environment: {
      ComputeType: 'BUILD_GENERAL1_SMALL',
      Image: 'aws/codebuild/nodejs:8.11.0',
      Type: 'LINUX_CONTAINER',
    },
    Name: projectName,
    ServiceRole: Fn.GetAtt('CodeBuildIamRole', 'Arn'),
    Source: {
      GitCloneDepth: 0,
      InsecureSsl: false,
      Location: `https://github.com/${repoSlug}`,
      ReportBuildStatus: true,
      Type: 'GITHUB',
    },
  }).dependsOn('CodeBuildIamRole');
};

export default (repoSlug: string, format: OutputFormat = 'json') => {
  const [, projectName] = repoSlug.split('/');

  const template = cloudform({
    Description: `${projectName} build stack`,
    Resources: {
      CodeBuildIamPolicy: generateIamPolicy(projectName),
      CodeBuildIamRole: generateIamRole(),
      CodeBuildProject: generateCodeBuildProject(projectName, repoSlug),
    },
  });

  return formatOutput(template, format);
};
